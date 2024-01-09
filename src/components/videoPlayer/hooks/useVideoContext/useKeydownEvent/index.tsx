import { useEffect } from 'react';

interface KeyDownEventProps {
  keyDownMapper: Record<string, VoidFunction>;
}
function useKeydownEvent({ keyDownMapper }: KeyDownEventProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = keyDownMapper[event.key];
      if (handler) {
        handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyDownMapper]);

  return {};
}

export default useKeydownEvent;
