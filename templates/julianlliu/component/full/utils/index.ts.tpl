// 主要存放从组件中抽出的业务逻辑，业务逻辑尽量与组件解耦

export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));
