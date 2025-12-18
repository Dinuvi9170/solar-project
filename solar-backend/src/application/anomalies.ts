import Anomalies from "../infrastructure/entity/anomalies";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { getAnomaliesBySolaridDto } from "../domain/dtos/anomaly";
import { ValidationError } from "../domain/errors/errors";

export const getAnomaliesBySolarid = async (req: Request,res: Response,next: NextFunction) => {
    try {
        const result = getAnomaliesBySolaridDto.safeParse(req.query);
        if (!result.success) {
            throw new ValidationError(result.error.message);
        }
        const { groupBy,limit } = result.data
        const solarUnitId = new mongoose.Types.ObjectId(req.params.id);

        if (!groupBy) {
        const anomalies = await Anomalies.find({
            solarUnitId,
            resolved: false,
        }).sort({ detection_time: -1 });

        return res.status(200).json(anomalies);
        }

        if (groupBy === "weekly") {
            const anomalies = await Anomalies.aggregate([
                {
                $match: {
                    solarUnitId,
                    resolved: false,
                },
                },
                {
                $group: {
                    _id: {
                    year: { $isoWeekYear: "$detection_time" },
                    week: { $isoWeek: "$detection_time" },
                    },
                    totalWeekAnomalies: { $sum: 1 },
                },
                },
                {
                $sort: { "_id.year": -1, "_id.week": -1 },
                },
            ]);
            if(!limit){
                return res.status(200).json(anomalies);
            }

            return res.status(200).json(anomalies.slice(0,parseInt(limit)));
        }

        if (groupBy === "daily") {
            const anomalies = await Anomalies.aggregate([
                {
                    $match: {
                        solarUnitId,
                        resolved: false,
                    },
                },
                {
                    $group: {
                        _id: {
                        date: {
                            $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$detection_time",
                            timezone: "UTC",
                            },
                        },
                        },
                        totalDayAnomalies: { $sum: 1 },
                    },
                },
                {
                    $sort: { "_id.date": -1 },
                },
            ]);
            if(!limit){
                return res.status(200).json(anomalies);
            }

            return (res.status(200).json(anomalies.slice(0,parseInt(limit))));
        }

        if (groupBy === "hourly") {
            const lastrecord = await Anomalies.findOne({
                solarUnitId,
                resolved: false
            }).sort({ detection_time: -1 }).select("detection_time");

            if (!lastrecord) {
                return res.status(404).json({ message: "No anomalies found" });
            }

            const latestTime = new Date(lastrecord.detection_time);
            const startTime = new Date(latestTime.getTime() - 24 * 60 * 60 * 1000);

            const anomalies = await Anomalies.aggregate([
                {
                    $match: {
                        solarUnitId,
                        resolved: false,
                        detection_time: { $gte: startTime, $lte: latestTime }
                    },
                },
                {
                    $group: {
                        _id: {
                            fourHour: {
                                $dateToString: {
                                    format: "%Y-%m-%d %H:00",
                                    date: {
                                        $dateFromParts: {
                                            year: { $year: { date: "$detection_time", timezone: "UTC" } },
                                            month: { $month: { date: "$detection_time", timezone: "UTC" } },
                                            day: { $dayOfMonth: { date: "$detection_time", timezone: "UTC" } },
                                            hour: {
                                                $multiply: [
                                                    { $floor: { $divide: [{ $hour: { date: "$detection_time", timezone: "UTC" } }, 4] } },
                                                    4
                                                ]
                                            },
                                            timezone: "UTC"
                                        }
                                    },
                                    timezone: "UTC"
                                }
                            }
                        },
                        totalFourHourAnomalies: { $sum: 1 },
                    },
                },
                {
                    $sort: { "_id.fourHour": -1 },
                },
            ]);

            return res.status(200).json(anomalies);
        }

    } catch (err) {
        next(err);
    }
};

export const getAnomaliesByType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const solarUnitId = new mongoose.Types.ObjectId(req.params.id);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const anomalies = await Anomalies.aggregate([
            {
                $match: {
                    solarUnitId,
                    resolved: false,
                    detection_time: { $gte: oneMonthAgo },
                },
            },
            {
                $group: {
                    _id: "$anomalyType",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    anomalyType: "$_id",
                    count: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(anomalies);
    } catch (err) {
        next(err);
    }
};
