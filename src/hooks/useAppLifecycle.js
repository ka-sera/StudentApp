import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

// Logs every time the app moves between foreground and background
export default function useAppLifecycle() {
  const previous = useRef(AppState.currentState);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (next) => {
      const prev = previous.current;
      let event = `${prev} -> ${next}`;

      if (prev.match(/inactive|background/) && next === 'active') {
        event += '  (returned to FOREGROUND)';
      } else if (next === 'background') {
        event += '  (moved to BACKGROUND)';
      }

      console.log('[AppState]', event);
      setLog((old) =>
        [{ time: new Date().toLocaleTimeString(), event }, ...old].slice(0, 20)
      );
      previous.current = next;
    });

    return () => subscription.remove();
  }, []);

  return log;
}