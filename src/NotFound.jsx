import react from 'react';

function NotFound(){
  return (
    <div className="flex flex-col self-center justify-center items-center w-[65vw] grow h-[60vh]">
      <h1 className="text-9xl">404</h1>
      <h1 className="text-xl">Page Not Found...</h1>
      <h2>Wrong url...</h2>
    </div>
  )
}

export default NotFound;