import { Link } from 'lucide-react'
import React from 'react'
 const newLocal = "/icon.png"
const footer = () => {
  return (
 <footer className="w-full bg-white border-t border-gray-100 px-6 py-12 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Branding Section */}
        <div className="flex flex-col gap-4">

          <p className="text-gray-500 text-sm leading-relaxed">
            The ultimate directory for discovering and managing your favorite servers. Built for the community.
           This site is not an official Minecraft service and is not approved by or associated with Mojang or Microsoft.
          </p>
        </div>

        {/* Quick Links */}
       
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-black">Useful</h4>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
          <a href="/help/votify">add Votify to your Server</a>
          <a href="/help/alredyadded">Your Server is alredy added?</a>
          <a href="/help/contact">Suggestions or Contact us</a>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-black">Serverlist</h4>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
          <a href="/serverliste/search">Search servers</a>
          <a href="/serverliste/addserver">Add server</a>
          </ul>
        </div>
        {/* Company/Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-black">Legal</h4>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
            <li><a 
  href="https://www.iubenda.com/privacy-policy/13495355" 
  className="iubenda-embed"
>
  Privacy Policy
</a></li>
           {/* Cookie Policy Link */}
      <a 
        href="https://www.iubenda.com/privacy-policy/13495355/cookie-policy" 
        className="iubenda-embed"
      >
        Cookie Policy
      </a>
          </ul>
      <ul className="flex flex-col gap-2 text-gray-600 text-sm"><a href="/impressum">
        Impressum
      </a> </ul>     
        </div>

        {/* Newsletter / CTA */}

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:row items-center justify-between gap-4">
        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} yourmclist.com . All rights reserved.
        </p>
        

      </div>
    </footer>
  )
}

export default footer