export function ignite (update) {
  const clock = {
    previous: null
  }

  function delta (time) {
    const seconds = time / 1000
    const result = clock.previous == null ? seconds : seconds - clock.previous
    clock.previous = seconds

    return result
  }

  function first (time) {
    update(delta(time))
    window.requestAnimationFrame(second)
  }

  function second (time) {
    update(delta(time))
    window.requestAnimationFrame(first)
  }

  window.requestAnimationFrame(first)
}
