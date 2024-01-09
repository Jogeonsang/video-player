/**
 * debounce 함수입니다.
 * 지정된 시간이 경과할 때까지 함수 호출을 지연시킨 후 실행합니다.
 * 연속된 호출이 있을 경우, 마지막 호출만 실행됩니다.
 *
 * @param {Function} callback - 지연 후 실행될 함수입니다.
 * @param {number} timeout - 지연 시간 (밀리초 단위). 기본값은 300ms입니다.
 * @returns {Function} - 지연된 실행을 위한 함수입니다.
 *
 * @example
 * ```ts
 * const delayedFunction = () => {
 *   console.log('Executed after delay');
 * };
 *
 * const debouncedFunction = debounce(delayedFunction, 300);
 * debouncedFunction();
 * ```
 */
export default function debounce<T extends unknown[]>(callback: (...args: T) => void, timeout = 300): (...args: T) => void {
  let timer: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callback(...args), timeout);
  };
}
