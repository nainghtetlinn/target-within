import React, { useState, createContext, useContext, useEffect } from 'react';
import { FaTasks } from 'react-icons/fa';
import { useRouter } from 'next/router';

export const Context = createContext();

const Provider = ({ children }) => {
  const [noti, setNoti] = useState({
    show: false,
    type: '',
    message: '',
  });
  const [isDark, setIsDark] = useState(false);
  const [sortType, setSortType] = useState('Sort by');
  const [targets, setTargets] = useState([
    {
      title: 'Lose 20kg',
      id: 1,
      startedDate: new Date(2022, 1, 2).getTime(),
      dueDate: new Date(2022, 2, 5).getTime(),
      complete: false,
      tasks: [
        { name: 'Drink water', complete: false },
        { name: 'meet doctor', complete: true },
      ],
    },
    {
      title: 'Lose 20kg',
      id: 3,
      startedDate: new Date(2021, 7, 2).getTime(),
      dueDate: new Date(2022, 4, 5).getTime(),
      complete: true,
      tasks: [
        { name: 'Drink water', complete: true },
        { name: 'meet doctor', complete: true },
      ],
    },
    {
      title: 'Lose 20kg',
      id: 2,
      startedDate: new Date(2021, 4, 2).getTime(),
      dueDate: new Date(2021, 8, 5).getTime(),
      complete: false,
      tasks: [
        { name: 'Drink water', complete: false },
        { name: 'meet doctor', complete: true },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.targets) {
      const temp = localStorage.getItem('targets');
      setTargets(JSON.parse(temp));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('targets', JSON.stringify(targets));
  }, [targets]);

  const router = useRouter();

  const checkIsComplete = (id) => {
    const newTargets = targets.map((target) => {
      if (target.id == id) {
        const isTrue = target.tasks.every((task) => {
          if (task.complete) {
            return true;
          } else {
            return false;
          }
        });
        return { ...target, complete: isTrue };
      } else {
        return target;
      }
    });
    targets = newTargets;
    setTargets((prev) => newTargets);
  };

  const toggleFinish = (id, index) => {
    const newTargets = targets.map((target) => {
      if (target.id == id) {
        const newTasks = target.tasks.map((task, i) => {
          if (i == index) {
            return { ...task, complete: !task.complete };
          } else {
            return task;
          }
        });
        return { ...target, tasks: newTasks };
      } else {
        return target;
      }
    });
    targets = newTargets;
    setTargets((prev) => newTargets);
    checkIsComplete(id);
  };

  const sortByNewest = (x) => {
    setTargets(targets.sort((a, b) => b.startedDate - a.startedDate));
    setSortType((prev) => (prev = 'Newest tasks'));
    router.push('/');
  };

  const sortByOldest = () => {
    setTargets(targets.sort((a, b) => a.startedDate - b.startedDate));
    setSortType((prev) => (prev = 'Oldest tasks'));
    router.push('/');
  };

  const sortByNearDeadline = () => {
    setTargets(targets.sort((a, b) => a.dueDate - b.dueDate));
    setSortType((prev) => (prev = 'Near deadline'));
    router.push('/');
  };

  const sortByIncomplete = () => {
    setTargets(targets.sort((a, b) => a.complete - b.complete));
    setSortType((prev) => (prev = 'Incomplete'));
    router.push('/');
  };

  const deleteTarget = (id) => {
    const a = targets.filter((t) => {
      return t.id !== id;
    });
    setTargets(a);
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const fixNumber = (a) => {
    return a < 10 ? '0' + a : a;
  };

  const showNoti = (show = false, type = '', message = '') => {
    setNoti({ show, type, message });
  };

  return (
    <Context.Provider
      value={{
        isDark,
        setIsDark,
        targets,
        setTargets,
        toggleFinish,
        fixNumber,
        sortType,
        sortByNewest,
        sortByOldest,
        sortByNearDeadline,
        sortByIncomplete,
        deleteTarget,
        showNoti,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobelContext = () => {
  return useContext(Context);
};

export default Provider;
