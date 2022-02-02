import React, { useState, useRef, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import Circle from './Circle';
import { useGlobelContext } from '../context';

const SingleTarget = ({ title, tasks, id, startedDate, dueDate, complete }) => {
  const { toggleFinish, fixNumber, deleteTarget } = useGlobelContext();

  // function to convert milliseconds to date
  const formetDate = (milli) => {
    return new Date(milli);
  };

  // calculate added time
  const historyDate = `Tasks are started since ${fixNumber(
    formetDate(startedDate).getDate()
  )}, ${fixNumber(formetDate(startedDate).getMonth())} ${formetDate(
    startedDate
  ).getFullYear()}`;

  // calculate left time
  let percentLeftTime = 0;
  if (dueDate > new Date().getTime()) {
    const timeGapStartedDue = dueDate - startedDate;
    const leftTime = dueDate - new Date().getTime();
    percentLeftTime = Math.floor((100 * leftTime) / timeGapStartedDue);
  }

  // calculate percent
  const totalTasks = tasks.length;
  const finishedTasks = tasks.filter((task) => {
    return task.complete;
  }).length;
  const percent = Math.floor((100 * finishedTasks) / totalTasks);

  // toggle task container
  const [openTask, setOpenTask] = useState(false);
  const taskContainer = useRef();
  const taskHeight = useRef();
  const toggleTask = () => {
    setOpenTask(!openTask);
  };
  useEffect(() => {
    if (openTask) {
      taskContainer.current.style.height = `${taskHeight.current.offsetHeight}px`;
    } else {
      taskContainer.current.style.height = '0';
    }
  }, [openTask]);

  const DueDateComp = () => {
    return (
      <>
        <div>Due Date</div>
        <div>{`${fixNumber(formetDate(dueDate).getDate())}, ${fixNumber(
          formetDate(dueDate).getMonth() + 1
        )} ${formetDate(dueDate).getFullYear()} [${fixNumber(
          formetDate(dueDate).getHours()
        )}hr : ${fixNumber(formetDate(dueDate).getMinutes())}]`}</div>
      </>
    );
  };

  const ExpiredDate = () => {
    return <div className="text-danger">Expired</div>;
  };

  const Complete = () => {
    return <div className="text-success">Completed!</div>;
  };

  return (
    <article className="my-3 bg-white dark:bg-dPri dark:text-white rounded-md overflow-hidden">
      <main>
        {/* section for title */}
        <section className="px-5 pt-2 pb-1 text-sm font-semibold flex justify-between items-center border-b-2 dark:border-white/50">
          {complete && <Complete />}
          {!complete && percentLeftTime <= 0 ? <ExpiredDate /> : ''}
          {!complete && percentLeftTime > 0 ? <DueDateComp /> : ''}
          <div
            className="hover:text-danger select-none cursor-pointer text-xl"
            onClick={() => deleteTarget(id)}
          >
            <BsTrash />
          </div>
        </section>
        {/* section for title */}
        <section
          className="flex justify-between items-center px-5 py-2"
          onClick={toggleTask}
        >
          <div
            className={`${complete ? 'text-success' : ''} ${
              percentLeftTime <= 0 ? 'text-danger' : ''
            } font-bold text-xl capitalize`}
          >
            {title}
          </div>
          <div className="flex items-center cursor-pointer">
            <Circle percent={percent} />
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </section>
        {/* section for progress bar */}
        <section className={`h-[5px] bg-secondary/60`}>
          <div
            className="h-full bg-primary"
            style={{ maxWidth: `${percentLeftTime}%` }}
          ></div>
        </section>
      </main>
      <aside ref={taskContainer} className="overflow-hidden transition-all">
        <div ref={taskHeight} className="px-5 py-2">
          <div className="italic text-right mb-1">{historyDate}</div>
          {tasks.map((task, index) => {
            const { name, complete } = task;
            return (
              <div key={index} className="py-[2px] flex justify-between">
                <h4>{name}</h4>
                <button
                  onClick={() => {
                    toggleFinish(id, index);
                  }}
                >
                  {complete ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                </button>
              </div>
            );
          })}
        </div>
      </aside>
    </article>
  );
};

export default SingleTarget;
