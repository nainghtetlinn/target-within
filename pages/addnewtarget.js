import React, { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useGlobelContext } from '../context';

const AddNewTarget = () => {
  const { setTargets } = useGlobelContext();
  const [properties, setProperties] = useState({
    title: '',
    dueDate: '',
    dueTime: '',
    tasks: [{ name: '', complete: false }],
  });

  const handlerChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index === null) {
      setProperties({ ...properties, [name]: value });
    } else {
      const temp = [...properties.tasks];
      temp[index].name = value;
      setProperties({ ...properties, tasks: temp });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [year, month, day] = properties.dueDate.split('-');
    const [hours, minutes] = properties.dueTime.split(':');
    const title = properties.title;
    const startedDate = new Date().getTime();
    const dueDate = new Date(year, month, day, hours, minutes).getTime();
    const tasks = properties.tasks;
    const id = startedDate;

    const newTarget = {
      title,
      id,
      startedDate,
      dueDate,
      tasks,
      complete: false,
    };

    setTargets((prev) => {
      return (prev = [...prev, newTarget]);
    });
    setProperties({
      title: '',
      dueDate: '',
      dueTime: '',
      tasks: [{ name: '', complete: false }],
    });
  };

  const addTask = () => {
    setProperties({
      ...properties,
      tasks: [...properties.tasks, { name: '', complete: false }],
    });
  };
  const removeTask = (i) => {
    const temp = [...properties.tasks];
    temp.splice(i, 1);
    setProperties({ ...properties, tasks: temp });
  };

  return (
    <main className="text-primary dark:text-white min-h-[92vh] flex justify-center items-center p-2 mb-[5rem] dark:bg-dSec">
      <fieldset className="border-2 border-primary dark:border-white p-3 w-full dark:bg-dPri">
        <legend className="font-semibold text-xl">Add New Target</legend>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="text-lg font-medium">
              Title :
            </label>
            <input
              required
              type="text"
              id="title"
              name="title"
              placeholder="eg. Finish a book"
              value={properties.title}
              onChange={handlerChange}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="dueDate" className="text-lg font-medium">
              Due Date :
            </label>
            <input
              required
              type="date"
              id="dueDate"
              name="dueDate"
              value={properties.dueDate}
              onChange={handlerChange}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="dueTime" className="text-lg font-medium">
              Due Time :
            </label>
            <input
              required
              type="time"
              id="dueTime"
              name="dueTime"
              value={properties.dueTime}
              onChange={handlerChange}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-lg font-medium">Tasks :</label>
            {properties.tasks.map((t, i) => {
              return (
                <div key={i} className="mb-2">
                  <div className="relative">
                    <input
                      required
                      className="w-full"
                      type="text"
                      name="task"
                      value={t.name}
                      onChange={(e) => handlerChange(e, i)}
                    />
                    {properties.tasks.length > 1 && (
                      <button
                        type="button"
                        className="absolute z-10 right-2 top-1/2 translate-y-[-50%] text-xl"
                        onClick={() => removeTask(i)}
                      >
                        <AiFillCloseCircle />
                      </button>
                    )}
                  </div>
                  {properties.tasks.length - 1 === i &&
                    properties.tasks.length < 10 && (
                      <button
                        type="button"
                        className="w-full p-2 mt-2 text-2xl border-2 border-primary border-dashed rounded-md flex justify-center"
                        onClick={addTask}
                      >
                        <BsFillPlusCircleFill />
                      </button>
                    )}
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full p-2 text-center rounded-md"
          >
            Add Target
          </button>
        </form>
      </fieldset>
    </main>
  );
};

export default AddNewTarget;
