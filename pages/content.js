import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

const content = () => {
  return (
    <section className="min-h-[92vh] w-full flex flex-col justify-center p-5 text-primary dark:text-white dark:bg-dSec">
      <div className="text-xl">
        <h3 className="mb-5">Here are my social accounts.</h3>
        <a
          href="https://www.linkedin.com/in/naing-htet-linn-111252228/"
          target={'_blank'}
          rel="noreferrer"
          className="flex items-center justify-between hover:text-[#094067] dark:hover:text-slate-300 w-3/12"
        >
          LinkedIn <BsLinkedin />
        </a>
        <a
          href="https://github.com/naing-htet-linn"
          target={'_blank'}
          rel="noreferrer"
          className="flex items-center justify-between hover:text-[#094067] dark:hover:text-slate-300 w-3/12"
        >
          Github <BsGithub />
        </a>
      </div>
    </section>
  );
};

export default content;
