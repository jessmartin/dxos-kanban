import React, { useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  ClientProvider,
  Config,
  Dynamics,
  Local,
  Defaults,
  useShell,
} from "@dxos/react-client";
import { useSpace, useQuery } from "@dxos/react-client/echo";

import { Kanban } from "./Kanban";
import { Task, types } from "./proto";

// Dynamics allows configuration to be supplied by the hosting KUBE.
const config = async () => new Config(await Dynamics(), Local(), Defaults());

export const TaskListContainer = () => {
  const { spaceKey } = useParams<{ spaceKey: string }>();

  const space = useSpace(spaceKey);
  const tasks = useQuery<Task>(space, Task.filter());
  const activeTasks = tasks.filter(
    (todo) =>
      !todo.completed && (todo.status === undefined || todo.status !== "doing")
  );
  const completedTasks = tasks.filter((todo) => todo.completed);
  const doingTasks = tasks.filter(
    (todo) => !todo.completed && todo.status === "doing"
  );
  // const shell = useShell();

  return (
    <Kanban
      activeTasks={activeTasks}
      doingTasks={doingTasks}
      completedTasks={completedTasks}
      // onInviteClick={async () => {
      //   if (!space) {
      //     return;
      //   }
      //   void shell.shareSpace({ spaceKey: space?.key });
      //   // TODO: desired API to teach shell how to form share URLs
      //   // void shell.shareSpace({ spaceKey: space?.key, invitationUrl: (invitationCode) => `/space/${space.key}?spaceInvitationCode=${invitationCode}` });
      // }}
      onTaskCreate={(newTaskTitle, status, completed) => {
        const task = new Task({ title: newTaskTitle, status, completed });
        space?.db.add(task);
      }}
      // onTaskRemove={(task) => {
      //   space?.db.remove(task);
      // }}
      onTaskTitleChange={(task, newTitle) => {
        task.title = newTitle;
      }}
      // onTaskCheck={(task, checked) => {
      //   task.completed = checked;
      // }}
    />
  );
};

export const Home = () => {
  const space = useSpace();
  const shell = useShell();
  const [search, setSearchParams] = useSearchParams();
  const invitationCode = search.get("spaceInvitationCode");
  const deviceInvitationCode = search.get("deviceInvitationCode");
  const navigate = useNavigate();

  useEffect(() => {
    if (deviceInvitationCode) {
      setSearchParams((p) => {
        p.delete("deviceInvitationCode");
        return p;
      });
    } else if (invitationCode) {
      setSearchParams((p) => {
        p.delete("spaceInvitationCode");
        return p;
      });
      void (async () => {
        const { space } = await shell.joinSpace({ invitationCode });
        if (space) {
          navigate(`/space/${space.key}`);
        }
      })();
    }
  }, [invitationCode, deviceInvitationCode]);

  return space ? <Navigate to={`/space/${space.key}`} /> : null;
};

const router = createBrowserRouter([
  {
    path: "/space/:spaceKey",
    element: <TaskListContainer />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export const App = () => {
  return (
    <ClientProvider
      config={config}
      onInitialized={async (client) => {
        const searchParams = new URLSearchParams(location.search);
        if (
          !client.halo.identity.get() &&
          !searchParams.has("deviceInvitationCode")
        ) {
          await client.halo.createIdentity();
        }
        client.addTypes(types);
      }}
    >
      <RouterProvider router={router} />
    </ClientProvider>
  );
};
