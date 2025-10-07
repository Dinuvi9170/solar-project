import {Zap, Facebook,Twitter, Linkedin,Github,Shrimp,MapPin,Phone,Mail } from 'lucide-react';
const Footer = ()=>{
    return(
        <div className="px-32 py-10 flex flex-col-4 bg-gray-50">
            <div>
                <div className='flex gap-2 mb-5'>
                    <div className='p-2 bg-lime-600 rounded-full w-10 h-10'>
                        <Zap className='w-6 h-6 mb-1 mr-2 '/>
                    </div>
                    <div className='text-xl font-bold text-blue-600'>Smart Energy</div>
                </div>
                <span className='block'>Revolutionizing wind farm management</span>
                <span className='block'> through advanced digital twin technology and </span>
                <span className='block'>predictive insights.</span>
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
            <div className='px-10'>
                <div className='flex gap-2 mb-5'>
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
            <div className='px-10 '>
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
            <div className='px-10'>
                 <span className='font-bold'>Get in Touch</span>
                 <ul className='mt-5 space-y-3'>
                    <li className='flex max-w-xs'>
                        <MapPin color='yellow' className='mr-2 w-10 h-10'/>
                        <span className='break-words mr-20'>123 Innovation Drive Energy Teck Park Copenhagen, Denmark</span>
                    </li>
                    <li className='flex max-w-xs'>
                        <Phone color='yellow' className='mr-2 w-5 h-5' />+45 33 22 11 00
                    </li>
                    <li className='flex max-w-xs'><Mail color='yellow' className='mr-2 w-5 h-5' />contact@smartenergy.com</li>
                </ul>
                <div className='mt-5'>
                    <span className='font-bold'>Stay Updated</span>
                    <div className='shadow-sm px-3 py-2 rounded-lg'>
                        <input name='email' type='email' placeholder="jane@example.com"/>
                    </div>
                    <button className='block mt-5 bg-blue-600 text-white font-bold w-full h-8 rounded-lg ' name='submit' type='submit'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Footer;