import React from 'react';

const about = () => {
  console.log('about rendered');
  return (
    <section className="min-h-[92vh] w-full flex flex-col justify-center p-5 text-primary dark:text-white dark:bg-dSec">
      <h3>For who</h3>
      <div>
        This app is made for those who is lazy to finish tasks which have to be
        done in certain time.
      </div>
      <div>
        This app can be used as a to-do-list (like to-do-list app but this app
        is more special as it contains timer *cool-emoji*)
      </div>
      <h3 className="mt-8">How this app become</h3>
      <div>
        I got this idea when I attempt an online event called == VarCamp.
      </div>
      <div>
        During that event I notice myself that there are still many things I
        have to know as a web developer.
      </div>
      <div className="mt-5">
        So I made this app to force study about web development as Im lazy in
        studying.
      </div>
      <div className="mt-5">Sorry for my bad English</div>
    </section>
  );
};

export default about;
