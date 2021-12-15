const form = [
  {
    name: "chat_id_",
    description: "the id of telegram chat",
    form: {
      type: "text"
    }
  },
  {
    name: "merge_timeout",
    description: "todo",
    form: {
      type: "int",
      default: 30,

      range: {
        from: 1,
        end: Infinity
      }
    }
  },
  {
    name: "lol",

  },
  {
    name: "redbool",
    form: {
      default: true,
      type: "bool"

    }
  }
]

const mappings = {
  1.3: form
}

export default mappings