import React from 'react'
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#4a5c58] text-white py-4 overflow-hidden">
      <div className="whitespace-nowrap">
        {/* This is the text that will scroll. We apply our custom animation to it. */}
        <p className="inline-block scrollText text-xl animate-scroll-left">
          Nisha & Amit are getting married! ❤️ The Jain Family warmly welcomes you 🎉 Join us for the celebration at the Ram Raja Hotel ✨Aate hain jis bhaav se milne bhakton ko bhagwan,Usi bhaav se shaadi mein aap bhi darshan de shriman ✨
        </p>
      </div>
    </footer>
  )
}

export default Footer