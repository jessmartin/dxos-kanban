/**
 * @generated @dxos/echo-typegen src/proto/schema.proto
 **/

import * as dxos_echo_schema from "@dxos/echo-schema";

export const types = new dxos_echo_schema.TypeCollection();

export type TaskProps = {
  title: string;
  completed: boolean;
  status: string;
};

export class Task extends dxos_echo_schema.TypedObject<TaskProps> {
  declare static readonly schema: dxos_echo_schema.Schema;

  static filter(opts?: Partial<TaskProps>): dxos_echo_schema.TypeFilter<Task> {
    return { ...opts, "@type": "dxos.app.tasks.Task" } as any;
  }

  constructor(
    initValues?: Partial<TaskProps>,
    opts?: dxos_echo_schema.TypedObjectOptions
  ) {
    super({ ...initValues }, { schema: Task.schema, ...opts });
  }
  declare title: string;
  declare completed: boolean;
  declare status: string;
}

types.registerPrototype(Task, {
  typename: "dxos.app.tasks.Task",
  props: [
    { id: "title", type: 1, repeated: false },
    { id: "completed", type: 3, repeated: false },
    { id: "status", type: 1, repeated: false },
  ],
});

types.link();
