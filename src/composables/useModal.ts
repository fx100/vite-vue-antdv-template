type Props = Record<string, unknown>

export function useModal(initProps: Props = {}) {
  let visible = $ref(false)

  let confirmLoading = $ref(false)

  let onOk = $ref<() => void>()
  let onCancel = $ref<() => void>()

  let _showProps = $ref<Props>({})

  const props = computed(() => {
    return {
      ...initProps,
      ..._showProps,
      visible,
      confirmLoading,
      onOk,
      onCancel,
    }
  })

  async function show(showProps: Props = {}, execFn: () => Promise<unknown>) {
    _showProps = showProps
    visible = true
    return new Promise<unknown>((resolve, reject) => {
      onOk = async () => {
        confirmLoading = true
        try {
          const ret = await execFn()
          visible = false
          resolve(ret)
        } catch (err) {
          // execFn reject
        }
        confirmLoading = false
      }
      onCancel = () => {
        visible = false
        reject()
      }
    })
  }

  return [props, show] as [typeof props, typeof show]
}

export default useModal
