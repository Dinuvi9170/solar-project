import {Zap, Facebook,Twitter, Linkedin,Github,Shrimp,MapPin,Phone,Mail, LucideCopyright } from 'lucide-react';
const Footer = ()=>{
    return(
        <>
            <div className="px-6 md:px-32 py-10 flex flex-col bg-gray-50 md:flex-row md:justify-between gap-10 md:gap-0 flex-wrap">
                <div className="flex-1 min-w-[250px]">
                    <div className='flex items-center gap-2 mb-5'>
                        <div className='p-2 bg-lime-600 rounded-full w-10 h-10'>
                            <Zap className='w-6 h-6 mb-1 mr-2 '/>
                        </div>
                        <div className='text-xl font-bold text-blue-600'>Solarix Energy</div>
                    </div>
                    <span className='block'>Revolutionizing wind farm management</span>
                    <span className='block'> through advanced digital twin technology </span>
                    <span className='block'>and predictive insights.</span>
                    <div className='flex gap-1 mt-5'>
                        <div className='px-1 py-1 bg-gray-200 w-8 h-8 rounded-full'>
                            <Facebook className='w-6 h-6'/>
                        </div>
                        <div className='px-1 py-1 bg-gray-200 w-8 h-8 rounded-full'>
                            <Twitter className='w-6 h-6'/>
                        </div>
                        <div className='px-1 py-1 bg-gray-200 w-8 h-8 rounded-full'>
                            <Linkedin className='w-6 h-6'/>
                        </div>
                        <div className='px-1 py-1 bg-gray-200 w-8 h-8 rounded-full'>
                            <Github className='w-6 h-6'/>
                        </div>
                    </div>
                </div>
                <div className='px-15'>
                    <div className='flex items-center gap-2 mb-5'>
                        <Shrimp color='yellow' />
                        <span className='font-bold'>Solutions</span>
                    </div>
                    <ul className='space-y-3'>
                        <li>Digital Twin Platform</li>
                        <li>Predective Analysis</li>
                        <li>Remote Monitoring</li>
                        <li>Performance Optimization</li>
                        <li>Real-time Alerts</li>
                        <li>Maintainance Planning</li>
                    </ul>
                </div>
                <div className='px-15'>
                    <span className='font-bold'>Resources</span>
                    <ul className='mt-5 space-y-3'>
                        <li>Documentation</li>
                        <li>API References</li>
                        <li>Case Studies</li>
                        <li>White Papers</li>
                        <li>Blog</li>
                        <li>Support Center</li>
                    </ul>
                </div>
                <div className='pl-15'>
                    <span className='font-bold'>Get in Touch</span>
                    <ul className='mt-5 space-y-3'>
                        <li className='flex max-w-xs'>
                            <MapPin color='yellow' className='mr-2 w-12 h-12'/>
                            <span className='break-words mr-20'>123 Innovation Drive Energy Teck Park Copenhagen, Denmark</span>
                        </li>
                        <li className='flex max-w-xs'>
                            <Phone color='yellow' className='mr-2 w-5 h-5' />+45 33 22 11 00
                        </li>
                        <li className='flex max-w-xs'><Mail color='yellow' className='mr-2 w-5 h-5' />contact@Solarixenergy.com</li>
                    </ul>
                    <div className='mt-5 flex flex-col'>
                        <span className='font-bold py-2 mb-2'>Stay Updated</span>
                        <div className='shadow-sm px-3 py-2 rounded-lg '>
                            <input name='email' type='email' placeholder="jane@example.com"/>
                        </div>
                        <button className='block mt-5 bg-blue-600 text-white font-bold w-full h-8 rounded-lg ' name='submit' type='submit'>Submit</button>
                    </div>
                </div>
            </div>
            <div className='w-full h-10 bg-white items-center justify-between flex flex-col md:flex-row px-6 py-3 md:px-32 text-xs font-semibold text-gray-500'>
                    <div className='flex flex-wrap justify-center md:justify-start gap-5'>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookie Policy</span>
                        <span>Accessibility</span>
                    </div>
                    <div className='flex justify-center items-center gap-1'>
                        <LucideCopyright className='w-4 h-4'/> 
                        <span>2025 Solarix Energy. All rights reserved.</span>
                    </div>
            </div>
        </>
    )
}

export default Footer;