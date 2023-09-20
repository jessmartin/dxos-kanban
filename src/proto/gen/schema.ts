/**
 * @generated @dxos/echo-typegen src/proto/schema.proto
 **/

import * as dxos_echo_schema from "@dxos/echo-schema";

const schemaJson =
  '{"nested":{"dxos":{"nested":{"app":{"nested":{"tasks":{"nested":{"Task":{"options":{"(object)":true},"fields":{"title":{"type":"string","id":1},"completed":{"type":"bool","id":2},"status":{"type":"string","id":3}}}}}}}}}}}';

export const schema = dxos_echo_schema.EchoSchema.fromJson(schemaJson);

export type TaskProps = {
  title: string;
  completed: boolean;
  status: string;
};

export class Task extends dxos_echo_schema.TypedObject<TaskProps> {
  static readonly type = schema.getType("dxos.app.tasks.Task");

  static filter(opts?: Partial<TaskProps>): dxos_echo_schema.TypeFilter<Task> {
    return Task.type.createFilter(opts);
  }

  constructor(
    initValues?: Partial<TaskProps>,
    opts?: dxos_echo_schema.TypedObjectOpts
  ) {
    super({ ...initValues }, Task.type, opts);
  }
  declare title: string;
  declare completed: boolean;
  declare status: string;
}

schema.registerPrototype(Task);
