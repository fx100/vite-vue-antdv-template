const tableProps = {
  pagination: {
    showLessItems: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
  },
}

export default tableProps
