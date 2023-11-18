import { PrismaClient } from "@prisma/client";

import { userDto } from "../dtos/user-dtos";
import { SuccesReq } from "../dtos/global-dtos";
import {
  Project,
  Thread,
  ThreadsCreate,
  ThreadsEdit,
} from "../dtos/Thread-dtos";

import ApiError from "../exceptions/api-error";

const prisma = new PrismaClient();

class ThreadsService {
  async getUsers(user: userDto): Promise<userDto[]> {
    const users = await prisma.users.findMany();

    return users.map((u) => {
      return {
        userId: u.id,
        link: u.link,
        isAdmin: u.isAdmin,
      };
    });
  }

  async getProjects(user: userDto): Promise<Project[]> {
    let projects;
    if (user.isAdmin) {
      projects = await prisma.thread.findMany({
        where: {
          parent: null,
        },
      });
    } else {
      projects = await prisma.thread.findMany({
        where: {
          parent: null,
          OR: [
            {
              creator: {
                id: user.userId,
              },
            },
            {
              solver: {
                id: user.userId,
              },
            },
            {
              solver: null,
            },
          ],
        },
        orderBy: {
          id: "asc",
        },
      });
    }
    return projects.map((proj) => {
      return {
        id: proj.id,
        title: proj.title,
      };
    });
  }

  async editThread(thread: ThreadsEdit, user: userDto): Promise<SuccesReq> {
    if (thread.solver_id === undefined) {
      await prisma.thread.update({
        where: {
          id: thread.id,
        },
        data: {
          title: thread.title,
          comment: thread.comment,
          creator: {
            connect: {
              id: user.userId,
            },
          },
          tag: thread.tag,
        },
      });
    } else {
      await prisma.thread.update({
        where: {
          id: thread.id,
        },
        data: {
          title: thread.title,
          comment: thread.comment,
          creator: {
            connect: {
              id: user.userId,
            },
          },
          solver: {
            connect: {
              id: thread.solver_id,
            },
          },
          tag: thread.tag,
        },
      });
    }
    return {
      message: "success",
    };
  }

  async addThread(thread: ThreadsCreate, user: userDto): Promise<SuccesReq> {
    if (thread.parent_id === null) {
      if (thread.solver_id === undefined) {
        await prisma.thread.create({
          data: {
            title: thread.title,
            comment: thread.comment,
            creator: {
              connect: {
                id: user.userId,
              },
            },
            tag: thread.tag,
          },
        });
      } else {
        await prisma.thread.create({
          data: {
            title: thread.title,
            comment: thread.comment,
            creator: {
              connect: {
                id: user.userId,
              },
            },
            solver: {
              connect: {
                id: thread.solver_id,
              },
            },
            tag: thread.tag,
          },
        });
      }
    } else {
      if (thread.solver_id === undefined) {
        await prisma.thread.update({
          where: {
            id: thread.parent_id,
          },
          data: {
            childThreads: {
              create: {
                title: thread.title,
                comment: thread.comment,
                creator: {
                  connect: {
                    id: user.userId,
                  },
                },
                tag: thread.tag,
              },
            },
          },
        });
      } else {
        await prisma.thread.update({
          where: {
            id: thread.parent_id,
          },
          data: {
            childThreads: {
              create: {
                title: thread.title,
                comment: thread.comment,
                creator: {
                  connect: {
                    id: user.userId,
                  },
                },
                tag: thread.tag,
              },
            },
            solver: {
              connect: {
                id: thread.solver_id,
              },
            },
          },
        });
      }
    }

    return {
      message: "success",
    };
  }

  async RecursionFucking(thred_id: number, user: userDto): Promise<Thread> {
    let thread;
    if (user.isAdmin) {
      thread = await prisma.thread.findFirstOrThrow({
        where: { id: thred_id },
        include: {
          solver: true,
          reports: true,
          creator: true,
          childThreads: true,
          parent: true,
        },
      });
    } else {
      thread = await prisma.thread.findFirstOrThrow({
        where: {
          id: thred_id,
          OR: [
            {
              creator: {
                id: user.userId,
              },
            },
            {
              solver: {
                id: user.userId,
              },
            },
            {
              solver: null,
            },
          ],
        },
        include: {
          solver: true,
          reports: true,
          creator: true,
          childThreads: true,
          parent: true,
        },
      });
    }

    return {
      id: thread.id,
      creation_date: thread.creation_date,
      comment: thread.comment,
      creator: thread.creator,
      solver: thread.solver,
      parent_id: thread.parent?.id,
      reports: thread.reports,
      state_done: thread.state_done,
      state_error: thread.state_error,
      state_none: thread.state_none,
      state_skip: thread.state_skip,
      tag: thread.tag,
      title: thread.title,
      childThreads: await Promise.all(
        thread.childThreads.map(async (child) => {
          return await this.RecursionFucking(child.id, user);
        })
      ),
    };
  }

  async getDevices(proj_id: number, user: userDto): Promise<Thread> {
    let thread;
    if (user.isAdmin) {
      thread = await prisma.thread.findFirstOrThrow({
        where: {
          parent: null,
          id: proj_id,
        },
        include: {
          solver: true,
          reports: true,
          creator: true,
          childThreads: {
            where: {
              OR: [
                {
                  creator: {
                    id: user.userId,
                  },
                },
                {
                  solver: {
                    id: user.userId,
                  },
                },
                {
                  solver: null,
                },
              ],
            },
          },
          parent: true,
        },
      });
    } else {
      thread = await prisma.thread.findFirstOrThrow({
        where: {
          id: proj_id,
          parent: null,
          OR: [
            {
              creator: {
                id: user.userId,
              },
            },
            {
              solver: {
                id: user.userId,
              },
            },
            {
              solver: null,
            },
          ],
        },
        include: {
          solver: true,
          reports: true,
          creator: true,
          childThreads: {
            where: {
              OR: [
                {
                  creator: {
                    id: user.userId,
                  },
                },
                {
                  solver: {
                    id: user.userId,
                  },
                },
                {
                  solver: null,
                },
              ],
            },
          },
          parent: true,
        },
        orderBy: {
          id: "asc",
        },
      });
    }

    return {
      id: thread.id,
      creation_date: thread.creation_date,
      comment: thread.comment,
      creator: thread.creator,
      solver: thread.solver,
      parent_id: thread.parent?.id,
      reports: thread.reports,
      state_done: thread.state_done,
      state_error: thread.state_error,
      state_none: thread.state_none,
      state_skip: thread.state_skip,
      tag: thread.tag,
      title: thread.title,
      childThreads: await Promise.all(
        thread.childThreads.map(async (child) => {
          return await this.RecursionFucking(child.id, user);
        })
      ),
    };
  }
}

export default new ThreadsService();
