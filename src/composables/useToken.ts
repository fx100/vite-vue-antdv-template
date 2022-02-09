const key = 'token'

const bus = useEventBus<string>(key)

export function getToken() {
  return sessionStorage.getItem(key) || ''
}

export function setToken(value: string) {
  sessionStorage.setItem(key, value)
  bus.emit(value)
}

export function removeToken() {
  sessionStorage.removeItem(key)
  bus.emit('')
}

export function useToken() {
  let token = $ref(getToken())
  const unsubscribe = bus.on((event: string) => {
    token = event
  })
  onUnmounted(unsubscribe)
  return computed({
    get: () => token,
    set: setToken,
  })
}

export default useToken
