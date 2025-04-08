import { client } from '../mqttClient';
import { get14LengthId, get16LengthId } from '../text.utils';
import { Maybe } from '../types';
import { CleaningType } from './commands.schedules.type';
import { BotAct, BotCommand, BotType, LifeSpanDeviceType, MapSubSetType } from './commands.type';
import { sendJSONCommand } from './commands.utils';

export const clean = (
  params: BotAct,
  type: BotType = 'auto',
  value: Maybe<string> = null /* like mssid,mssid, etc */,
) => {
  const content = { total: 0, donotClean: 0, count: 0, type, bdTaskID: get16LengthId() };
  const command: BotCommand = {
    name: 'clean_V2',
    payload: {
      act: params,
      content: value ? { ...content, value } : content,
    },
  };
  sendJSONCommand(command, client);
};

export const go = (params: BotAct, value: Maybe<string> = null /* four numbers */) => {
  const content = { total: 0, donotClean: 0, count: 0, type: 'mapPoint', bdTaskID: get16LengthId() };
  const command: BotCommand = {
    name: 'clean_V2',
    payload: {
      act: params,
      content: value ? { ...content, value } : content,
    },
  };
  sendJSONCommand(command, client);
};
export const charge = () => {
  const command: BotCommand = {
    name: 'charge',
    payload: { act: 'go', bdTaskID: get16LengthId() },
  };
  sendJSONCommand(command, client);
};

export const playSound = (sid: number) => {
  const command: BotCommand = {
    name: 'playSound',
    payload: { sid },
  };
  sendJSONCommand(command, client);
};

export const setSpeed = (value: number) => {
  const command: BotCommand = {
    name: 'setSpeed',
    payload: { speed: value, bdTaskID: get16LengthId() },
  };
  sendJSONCommand(command, client);
};

export const EmptyDustBin = () => {
  const command: BotCommand = {
    name: 'setAutoEmpty',
    payload: { act: 'start' },
  };
  sendJSONCommand(command, client);
};

export const editAutoEmpty = (enable: number) => {
  const command: BotCommand = {
    name: 'setAutoEmpty',
    payload: { enable },
  };
  sendJSONCommand(command, client);
};
export const setCleanCount = (value: number) => {
  const command: BotCommand = {
    name: 'setCleanCount',
    payload: { count: value, bdTaskID: get16LengthId() },
  };
  sendJSONCommand(command, client);
};

export const setWaterInfo = (value: { amount?: number; sweepType?: number }) => {
  const command: BotCommand = {
    name: 'setWaterInfo',
    payload: { ...value, bdTaskID: get16LengthId() },
  };
  sendJSONCommand(command, client);
};

export const setRelocationState = () => {
  const command: BotCommand = {
    name: 'setRelocationState',
    payload: { mode: 'manu', bdTaskID: get16LengthId() },
  };
  sendJSONCommand(command, client);
};

export const setLiveLaunchPwd = () => {
  const command: BotCommand = {
    name: 'setLiveLaunchPwd',
    payload: { action: 'verify', pwd: process.env.ENCODED_PASSWORD, bdTaskID: get16LengthId() },
  };
  sendJSONCommand(command, client);
};

export const addSched_V2 = (
  hour: number,
  minute: number,
  repeat: string,
  mid: string,
  type: CleaningType,
  value?: string,
) => {
  const command: BotCommand = {
    name: 'setSched_V2',
    payload: {
      act: 'add',
      hour,
      enable: 1,
      repeat,
      mid,
      state: 0,
      trigger: 'app',
      content: { jsonStr: JSON.stringify({ content: { type, value } }), name: 'clean' },
      minute,
      sid: get14LengthId(),
      bdTaskID: get16LengthId(),
    },
  };
  sendJSONCommand(command, client);
};

export const editSched_V2 = (
  hour: number,
  minute: number,
  repeat: string,
  mid: string,
  type: CleaningType,
  sid: string,
  enable: number,
  value?: string,
) => {
  const command: BotCommand = {
    name: 'setSched_V2',
    payload: {
      act: 'mod',
      hour,
      enable,
      repeat,
      mid,
      state: 0,
      trigger: 'app',
      content: { jsonStr: JSON.stringify({ content: { type, value } }), name: 'clean' },
      minute,
      sid,
      bdTaskID: get16LengthId(),
    },
  };
  sendJSONCommand(command, client);
};

export const delSched_V2 = (sid: string) => {
  const command: BotCommand = {
    name: 'setSched_V2',
    payload: {
      act: 'del',
      sid,
    },
  };
  sendJSONCommand(command, client);
};

export const resetLifeSpan = (type: LifeSpanDeviceType) => {
  const command: BotCommand = {
    name: 'resetLifeSpan',
    payload: {
      type,
    },
  };
  sendJSONCommand(command, client);
};

const setMapSubSet = (
  mssid: Maybe<string> = null,
  mid: string,
  type: MapSubSetType,
  act: BotAct,
  value: Maybe<string> = null,
  subtype = '0',
  name: Maybe<string> = null,
) => {
  const command: BotCommand = {
    name: 'setMapSubSet',
    payload: {
      // cleanset: '1,0,2',
      // compress: 1,
      // center,
      // values,
      // count,
      // index
      mid,
      // valueSize,
      // totalCount,
      type,
      act,
      // cacheName,
      subtype /* between 0 and 15 for the rooms icons */,
      name,
      // seqIndex,
      value,
      // connections,
      mssid,
      // seq,
      bdTaskID: get16LengthId(),
    },
  };
  sendJSONCommand(command, client);
};

export const splitRoom = (mssid: string, mid: string, value: string) => {
  setMapSubSet(mssid, mid, 'ar', 'divide', value);
};

export const renameRoom = (mssid: string, mid: string, subtype: string, name: string) => {
  setMapSubSet(mssid, mid, 'ar', 'mod', null, subtype, name);
};

// with 4 int in value it's a wall, with 8 it's a zone.
export const addNoMopSubset = (value: string, mid: string) => {
  setMapSubSet(null, mid, 'mw', 'add', value);
};

export const addNoGoSubset = (value: string, mid: string) => {
  setMapSubSet(null, mid, 'vw', 'add', value);
};

export const delNoMopSubset = (mssid: string, mid: string) => {
  setMapSubSet(mssid, mid, 'mw', 'del');
};

export const delNoGoSubset = (mssid: string, mid: string) => {
  setMapSubSet(mssid, mid, 'vw', 'del');
};

const setMapSet = (act: BotAct, mid: string, type: MapSubSetType, subsets: { values: unknown; mssid: string }[]) => {
  const command: BotCommand = {
    name: 'setMapSet',
    payload: {
      // msid,
      act,
      // start,
      mid,
      type,
      subsets,
      bdTaskID: get16LengthId(),
    },
  };
  sendJSONCommand(command, client);
};

export const mergeRooms = (mid: string, subsets: { values: unknown; mssid: string }[]) => {
  setMapSet('merge', mid, 'ar', subsets);
};

const setCachedMapInfo = (
  act: BotAct,
  mid: string,
  reMid: Maybe<string> = null,
  name: Maybe<string> = null,
  isFake = true,
) => {
  const command: BotCommand = {
    name: 'setCachedMapInfo',
    payload: {
      itemType: 0,
      act,
      build: 1,
      reMid,
      mid,
      name,
      isFake,
      bdTaskID: get16LengthId(),
    },
  };
  sendJSONCommand(command, client);
};

export const renameMap = (mid: string, name: string) => {
  setCachedMapInfo('mod', mid, name);
};

export const deleteMap = (mid: string) => {
  setCachedMapInfo('del', mid);
};

// {"data":{"itemType":0,"act":"backup","built":1,"mid":"94258964","isFake":false,"bdTaskID":"1663934436611974"}}
export const saveMap = (mid: string) => {
  setCachedMapInfo('backup', mid);
};

// the 'reMid' for 'restore map id' is the 'backupId' of the currently used map when calling 'getCachedMapInfo'
// :{"data":{"reMid":"1087869604","itemType":0,"act":"restore","built":1,"mid":"94258964","isFake":false,"bdTaskID":"1671414257830275"}}
export const restoreMap = (mid: string, reMid: string) => {
  setCachedMapInfo('restore', mid, reMid);
};
