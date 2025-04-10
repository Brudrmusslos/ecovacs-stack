export type AtrOnAutoEmptyEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnAutoEmptyEventBody;
}

export type AtrOnAutoEmptyEventBody = {
    data: PurpleData;
}

export type PurpleData = {
    status:    number;
    enable:    number;
    frequency: Frequency;
}

export enum Frequency {
    Auto = "auto",
    CustomArea = "customArea",
    MapPoint = "mapPoint",
    SpotArea = "spotArea",
}

export type AtrOnAutoEmptyEventHeader = {
    pri:   number;
    tzm:   number;
    ts:    string;
    ver:   PurpleVer;
    fwVer: FwVer;
    hwVer: HwVer;
    wkVer: WkVer;
}

export enum FwVer {
    The168 = "1.6.8",
}

export enum HwVer {
    The011 = "0.1.1",
}

export enum PurpleVer {
    The001 = "0.0.1",
}

export enum WkVer {
    The0154 = "0.1.54",
}

export type AtrOnBatteryEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnBatteryEventBody;
}

export type AtrOnBatteryEventBody = {
    data: GetBatteryData;
}

export type GetBatteryData = {
    value: number;
    isLow: number;
}

export type AtrOnBreakPointStatusEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnBreakPointStatusEventBody;
}

export type AtrOnBreakPointStatusEventBody = {
    data: FluffyData;
}

export type FluffyData = {
    status: number;
}

export type AtrOnCachedMapInfoEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   GetCachedMapInfoClass;
}

export type GetCachedMapInfoClass = {
    code: number;
    msg:  Ret;
    data: GetCachedMapInfoData;
}

export type GetCachedMapInfoData = {
    enable: number;
    info:   Info[];
}

export type Info = {
    mid:            string;
    backupId:       string;
    status:         number;
    index:          number;
    using:          number;
    built:          number;
    name:           string;
    isFastBuilding: number;
}

export enum Ret {
    MergeArFail = "merge ar fail",
    Ok = "ok",
}

export type AtrOnChargeStateEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnChargeStateEventBody;
}

export type AtrOnChargeStateEventBody = {
    data: GetChargeStateData;
}

export type GetChargeStateData = {
    isCharging: number;
    mode:       PurpleMode;
}

export enum PurpleMode {
    AutoEmpty = "autoEmpty",
    Slot = "slot",
}

export type AtrOnCleanCountEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnCleanCountEventBody;
}

export type AtrOnCleanCountEventBody = {
    data: GetCleanCountData;
}

export type GetCleanCountData = {
    count: number;
}

export type AtrOnCleanInfoV2Event = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnCleanInfoV2EventBody;
}

export type AtrOnCleanInfoV2EventBody = {
    data: TentacledData;
}

export type TentacledData = {
    trigger:     Buildstate;
    state:       NameEnum;
    cleanState?: CleanState;
}

export type CleanState = {
    cid:         string;
    router:      string;
    motionState: string;
    content:     CleanStateContent;
}

export type CleanStateContent = {
    type?:  Frequency;
    value?: string;
    count?: number;
}

export enum NameEnum {
    Clean = "clean",
    GoCharging = "goCharging",
    Idle = "idle",
}

export enum Buildstate {
    Built = "built",
    None = "none",
}

export type AtrOnSleepEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnCleanPreferenceEventBody;
}

export type AtrOnCleanPreferenceEventBody = {
    data: GetBreakPointData;
}

export type GetBreakPointData = {
    enable: number;
}

export type AtrOnDModuleEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnDModuleEventBody;
}

export type AtrOnDModuleEventBody = {
    data: StickyData;
}

export type StickyData = {
    status: number;
    enable: number;
}

export type AtrOnDryingDurationEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnDryingDurationEventBody;
}

export type AtrOnDryingDurationEventBody = {
    data: IndigoData;
}

export type IndigoData = {
    duration: number;
}

export type AtrOnEfficiencyEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnEfficiencyEventBody;
}

export type AtrOnEfficiencyEventBody = {
    data: IndecentData;
}

export type IndecentData = {
    efficiency: number;
    support:    number;
}

export type AtrOnErrorEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnErrorEventBody;
}

export type AtrOnErrorEventBody = {
    data: HilariousData;
}

export type HilariousData = {
    code: number[];
}

export type AtrOnEvtEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnEvtEventBody;
}

export type AtrOnEvtEventBody = {
    data: AmbitiousData;
}

export type AmbitiousData = {
    code: number;
}

export type AtrOnFwBuryPointBdBasicinfoEvtEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdBasicinfoEvtEventBody;
}

export type AtrOnFwBuryPointBdBasicinfoEvtEventBody = {
    gid:   string;
    index: string;
    ts:    string;
    orig:  PurpleNew;
    new:   PurpleNew;
}

export type PurpleNew = {
    robotState?:  number;
    onCharger?:   number;
    chargeState?: number;
}

export type AtrOnFwBuryPointBdBasicinfoEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdBasicinfoEventBody;
}

export type AtrOnFwBuryPointBdBasicinfoEventBody = {
    gid:          Gid;
    index:        string;
    ts:           string;
    id:           string;
    battery:      number;
    chargeState:  number;
    onCharger:    number;
    robotState:   number;
    robotPos:     string;
    chargerPos:   ChargerPos;
    dirtboxState: number;
    mopState:     number;
}

export enum ChargerPos {
    The000000000 = "0.00,0.00,0.00",
}

export enum Gid {
    G1744211603783 = "G1744211603783",
}

export type AtrOnFwBuryPointMcuRestartEvtEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdCc10EventBody;
}

export type AtrOnFwBuryPointBdCc10EventBody = {
    gid:              string;
    index:            string;
    ts:               string;
    chargecase?:      number;
    dsc?:             number;
    type?:            number;
    gst?:             number;
    mapinfo?:         Mapinfo[];
    trigger?:         number;
    ultraSonicState?: number;
    id?:              string;
    remark?:          string;
}

export type Mapinfo = {
    mid:        string;
    areas:      number;
    watchpoint: number;
}

export type AtrOnFwBuryPointBdMsi03Event = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdMsi03EventBody[];
}

export type AtrOnFwBuryPointBdMsi03EventBody = {
    gid:   string;
    index: string;
    ts:    string;
    msi:   string;
    mt:    number;
}

export type AtrOnFwBuryPointBdOnlineEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdOfflineEventBody;
}

export type AtrOnFwBuryPointBdOfflineEventBody = {
    gid:      Gid;
    index:    string;
    ts:       string;
    mid:      string;
    bssid:    Bssid;
    robotMac: RobotMac;
    rssi:     number;
}

export enum Bssid {
    Empty = "",
    The684E05C23446 = "68:4E:05:C2:34:46",
}

export enum RobotMac {
    Empty = "",
    The6083E7F62F73 = "60:83:e7:f6:2f:73",
}

export type AtrOnFwBuryPointBdProcessStartEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdProcessStartEventBody;
}

export type AtrOnFwBuryPointBdProcessStartEventBody = {
    gid:   string;
    index: string;
    ts:    string;
    name:  string;
    pid:   number;
}

export type AtrOnFwBuryPointBdRci07Event = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdRci07EventBody;
}

export type AtrOnFwBuryPointBdRci07EventBody = {
    gid:   string;
    index: string;
    ts:    string;
    cv:    number;
    ows:   number;
}

export type AtrOnFwBuryPointBdReturnchargeinfoEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdReturnchargeinfoEventBody;
}

export type AtrOnFwBuryPointBdReturnchargeinfoEventBody = {
    gid:                            string;
    index:                          string;
    ts:                             string;
    startType:                      number;
    finishType:                     number;
    planResult:                     number;
    planElapsedTime:                number;
    totalElapsedTime:               number;
    jointElapsedTime:               number;
    detectMiddleCodeWhenPlanFinish: number;
    detectOmniWallWhenPlanFinish:   number;
    detectCodeWhenPlanFinish:       number;
    chargingStatus:                 number;
}

export type AtrOnFwBuryPointBdSettingEvtEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdSettingEvtEventBody;
}

export type AtrOnFwBuryPointBdSettingEvtEventBody = {
    gid:   string;
    index: string;
    ts:    string;
    orig:  FluffyNew;
    new:   FluffyNew;
}

export type FluffyNew = {
    cleanCount?:    number;
    waterAmount?:   number;
    fanspeed?:      number;
    continue?:      number;
    isPressurized?: number;
    aisl?:          number;
}

export type AtrOnFwBuryPointBdSettingEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdSettingEventBody;
}

export type AtrOnFwBuryPointBdSettingEventBody = {
    gid:                  Gid;
    index:                string;
    ts:                   string;
    id:                   string;
    aisl:                 number;
    isPressurized:        number;
    continue:             number;
    dnd:                  number;
    childLock:            number;
    autocollect:          number;
    personalClean:        number;
    fanspeed:             number;
    waterAmount:          number;
    cleanCount:           number;
    personalCleanSetting: any[];
}

export type AtrOnFwBuryPointBdSysinfoEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdSysinfoEventBody[];
}

export type AtrOnFwBuryPointBdSysinfoEventBody = {
    signal:  number;
    uptime:  string;
    meminfo: string;
    pos:     string;
    isvalid: number;
    mapid:   string;
    ts:      string;
}

export type AtrOnFwBuryPointBdTaskChargeStopEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdTaskChargeStartEventBody;
}

export type AtrOnFwBuryPointBdTaskChargeStartEventBody = {
    gid:                string;
    index:              string;
    ts:                 string;
    battery:            number;
    voltage:            number;
    chargerPos:         ChargerPos;
    chargeId:           string;
    returnToChargerId?: string;
}

export type AtrOnFwBuryPointBdTaskVideoGotoStopEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointBdTaskCleanAutoStartEventBody;
}

export type AtrOnFwBuryPointBdTaskCleanAutoStartEventBody = {
    gid:           string;
    index:         string;
    ts:            string;
    mid:           string;
    bid:           string;
    sid:           string;
    triggerType:   string;
    cleanId?:      string;
    buildstate?:   Buildstate;
    bumpcount?:    number;
    time?:         number;
    area?:         number;
    relocationId?: string;
    returnId?:     string;
    videoId?:      string;
}

export type AtrOnFwBuryPointWheelEvtEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnFwBuryPointChargeEvtEventBody;
}

export type AtrOnFwBuryPointChargeEvtEventBody = {
    gid:    string;
    index:  string;
    ts:     string;
    evtId:  string;
    evt:    number;
    remark: string;
    act:    number;
}

export type AtrOnMapSetV2Event = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnMapSetV2EventBody;
}

export type AtrOnMapSetV2EventBody = {
    data: CunningData;
}

export type CunningData = {
    type: DataType;
    mid:  string;
}

export enum DataType {
    Ar = "ar",
    Mw = "mw",
    Ol = "ol",
    Svw = "svw",
    Vw = "vw",
}

export type AtrOnMapStateEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnMapStateEventBody;
}

export type AtrOnMapStateEventBody = {
    data: MagentaData;
}

export type MagentaData = {
    state: string;
}

export type AtrOnSchedV2Event = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnNextSchedEventBody;
}

export type AtrOnNextSchedEventBody = {
    data?: Dat[];
}

export type Dat = {
    enable:       number;
    trigger:      string;
    sid:          string;
    state:        number;
    repeat:       string;
    hour:         number;
    minute:       number;
    mid:          string;
    mapNickName?: string;
    index?:       number;
    content:      DatumContent;
    act?:         string;
    bdTaskID?:    string;
}

export type DatumContent = {
    name:    NameEnum;
    jsonStr: string;
}

export type AtrOnRelocationStateEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnRelocationStateEventBody;
}

export type AtrOnRelocationStateEventBody = {
    data: FriskyData;
}

export type FriskyData = {
    mode:     FluffyMode;
    state:    ActEnum;
    isHasMap: number;
}

export enum FluffyMode {
    Lift = "lift",
}

export enum ActEnum {
    Break = "break",
    Start = "start",
}

export type AtrOnRosNodeReadyEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnRosNodeReadyEventBody;
}

export type AtrOnRosNodeReadyEventBody = {
    data: ValueClass;
}

export type ValueClass = {
}

export type AtrOnSimpleARMapSetEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnSimpleARMapSetEventBody;
}

export type AtrOnSimpleARMapSetEventBody = {
    data: MischievousData;
}

export type MischievousData = {
    type:    DataType;
    mid:     string;
    msid:    string;
    subsets: PurpleSubset[];
}

export type PurpleSubset = {
    name:       string;
    mssid:      string;
    subtype?:   string;
    totalCount: number;
}

export type AtrOnSpeedEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnSpeedEventBody;
}

export type AtrOnSpeedEventBody = {
    data: GetSpeedData;
}

export type GetSpeedData = {
    speed: number;
}

export type AtrOnStationStateEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnStationStateEventBody;
}

export type AtrOnStationStateEventBody = {
    data: BraggadociousData;
    code: number;
    msg:  Ret;
}

export type BraggadociousData = {
    content: PurpleContent;
    state:   number;
}

export type PurpleContent = {
    error:        any[];
    type?:        number;
    motionState?: number;
}

export type AtrOnStatsEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnStatsEventBody;
}

export type AtrOnStatsEventBody = {
    data: GetStatsData;
}

export type GetStatsData = {
    area:           number;
    time:           number;
    cid:            string;
    start:          string;
    type:           Frequency;
    enablePowerMop: number;
    powerMopType:   number;
    aiopen:         number;
    aitypes:        any[];
    avoidCount:     number;
}

export type AtrOnSweepVibrationEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnSweepVibrationEventBody;
}

export type AtrOnSweepVibrationEventBody = {
    data: Data1;
}

export type Data1 = {
    frequency: number;
}

export type AtrOnWaterInfoEvent = {
    header: AtrOnAutoEmptyEventHeader;
    body:   AtrOnWaterInfoEventBody;
}

export type AtrOnWaterInfoEventBody = {
    data: GetWaterInfoData;
}

export type GetWaterInfoData = {
    enable:    number;
    amount:    number;
    type:      number;
    sweepType: number;
}

export type P2PSetTimeRequest = {
    ts:      number;
    tsInSec: number;
}

export type P2PSetTimeResponse = {
    ret: Ret;
}

export type P2PChargeRequest = {
    body:   P2PChargeRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PChargeRequestBody = {
    data: Data2;
}

export type Data2 = {
    act:      string;
    bdTaskID: string;
}

export type P2PChargeRequestHeader = {
    pri: number;
    tzm: number;
    ts:  number;
    ver: FluffyVer;
}

export enum FluffyVer {
    The0022 = "0.0.22",
}

export type P2PSetWaterInfoResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PChargeResponseBody;
}

export type P2PChargeResponseBody = {
    code: number;
    msg:  Ret;
}

export type P2PCleanV2Request = {
    body:   P2PCleanV2RequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PCleanV2RequestBody = {
    data: Data3;
}

export type Data3 = {
    act:     string;
    content: FluffyContent;
}

export type FluffyContent = {
    total:      number;
    donotClean: number;
    count:      number;
    type:       Frequency;
    bdTaskID:   string;
    value?:     string;
}

export type P2PGetAIMapRequest = {
    body:   P2PGetAIMapRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PGetAIMapRequestBody = {
    data: Data4;
}

export type Data4 = {
    pointCount: number;
    pointStart: number;
    bdTaskID:   string;
}

export type P2PGetAIMapResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetAIMapResponseBody;
}

export type P2PGetAIMapResponseBody = {
    data: Data5;
    code: number;
    msg:  Ret;
}

export type Data5 = {
    mid:        string;
    pointValue: any[];
    pointStart: number;
    totalCount: number;
    pointCount: number;
}

export type P2PGetWaterInfoRequest = {
    body:   P2PGetAutoEmptyRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PGetAutoEmptyRequestBody = {
    data: Data6;
}

export type Data6 = {
    id: string;
}

export type P2PGetAutoEmptyResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetAutoEmptyResponseBody;
}

export type P2PGetAutoEmptyResponseBody = {
    code: number;
    msg:  Msg;
    data: PurpleData;
}

export enum Msg {
    Ok = "OK",
}

export type P2PGetBlockResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetBlockResponseBody;
}

export type P2PGetBlockResponseBody = {
    code: number;
    msg:  Ret;
    data: Data7;
}

export type Data7 = {
    enable: number;
    start:  Start;
    end:    End;
}

export enum End {
    The80 = "8:0",
}

export enum Start {
    The220 = "22:0",
}

export type P2PGetPosRequest = {
    body:   P2PGetInfoRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PGetInfoRequestBody = {
    data: string[];
}

export type P2PGetInfoResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetInfoResponseBody;
}

export type P2PGetInfoResponseBody = {
    code: number;
    msg:  Ret;
    data: Data8;
}

export type Data8 = {
    getStats?:         GetStats;
    getCachedMapInfo?: GetCachedMapInfoClass;
    getBreakPoint?:    GetBreakPoint;
    getCleanInfo?:     GetCleanInfo;
    getChargeState?:   GetChargeState;
    getBattery?:       GetBattery;
    getSpeed?:         GetSpeed;
    getCleanCount?:    GetCleanCount;
    getWaterInfo?:     GetWaterInfoClass;
    getRecognization?: GetRecognization;
}

export type GetBattery = {
    code: number;
    msg:  Ret;
    data: GetBatteryData;
}

export type GetBreakPoint = {
    data: GetBreakPointData;
    code: number;
    msg:  Ret;
}

export type GetChargeState = {
    code: number;
    msg:  Ret;
    data: GetChargeStateData;
}

export type GetCleanCount = {
    data: GetCleanCountData;
    code: number;
    msg:  Ret;
}

export type GetCleanInfo = {
    data: GetCleanInfoData;
    code: number;
    msg:  Ret;
}

export type GetCleanInfoData = {
    trigger: Buildstate;
    state:   NameEnum;
}

export type GetRecognization = {
    data: GetRecognizationData;
    code: number;
    msg:  Ret;
}

export type GetRecognizationData = {
    state:  number;
    update: number;
    items:  Item[];
}

export type Item = {
    type:  number;
    state: number;
}

export type GetSpeed = {
    code: number;
    msg:  Ret;
    data: GetSpeedData;
}

export type GetStats = {
    code: number;
    msg:  Ret;
    data: GetStatsData;
}

export type GetWaterInfoClass = {
    code: number;
    msg:  Ret;
    data: GetWaterInfoData;
}

export type P2PGetLifeSpanResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetLifeSpanResponseBody;
}

export type P2PGetLifeSpanResponseBody = {
    code: number;
    msg:  Ret;
    data: Datum[];
}

export type Datum = {
    type:  DatumType;
    left:  number;
    total: number;
}

export enum DatumType {
    Brush = "brush",
    DModule = "dModule",
    Heap = "heap",
    SideBrush = "sideBrush",
    UnitCare = "unitCare",
}

export type P2PGetMajorMapResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetMajorMapResponseBody;
}

export type P2PGetMajorMapResponseBody = {
    code: number;
    msg:  Ret;
    data: Data9;
}

export type Data9 = {
    mid:         string;
    pieceWidth:  number;
    pieceHeight: number;
    cellWidth:   number;
    cellHeight:  number;
    pixel:       number;
    value:       string;
    type:        DataType;
}

export type P2PGetMinorMapRequest = {
    body:   P2PGetMapInfoRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PGetMapInfoRequestBody = {
    data: Data10;
}

export type Data10 = {
    mid:         string;
    type:        DataType;
    bdTaskID?:   string;
    start?:      number;
    pieceIndex?: number;
    pieceValue?: string;
}

export type P2PGetMapSetResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetMapSetResponseBody;
}

export type P2PGetMapSetResponseBody = {
    code: number;
    msg:  Ret;
    data: Data11;
}

export type Data11 = {
    type:       DataType;
    count:      number;
    mid:        string;
    msid?:      string;
    subsets:    PurpleSubset[];
    hasUnRead?: number;
}

export type P2PGetMapSubSetRequest = {
    body:   P2PGetMapSubSetRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PGetMapSubSetRequestBody = {
    data: Data12;
}

export type Data12 = {
    msid:     string;
    value:    ValueClass;
    mid:      string;
    seqIndex: number;
    type:     DataType;
    mssid:    string;
    seq:      number;
    bdTaskID: string;
}

export type P2PGetMapSubSetResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetMapSubSetResponseBody;
}

export type P2PGetMapSubSetResponseBody = {
    code: number;
    msg:  Ret;
    data: Data13;
}

export type Data13 = {
    type:        DataType;
    subtype:     string;
    connections: Connections;
    name:        string;
    seqIndex:    number;
    seq:         number;
    count:       number;
    totalCount:  number;
    index:       number;
    cleanset:    Cleanset;
    valueSize:   number;
    compress:    number;
    center:      string;
    mssid:       string;
    value:       string;
    mid:         string;
}

export enum Cleanset {
    The102 = "1,0,2",
    The202 = "2,0,2",
}

export enum Connections {
    The0 = "0,",
    The04 = "0,4,",
    The123 = "1,2,3,",
    The3 = "3,",
}

export type P2PGetMapTraceRequest = {
    body:   P2PGetMapTraceRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PGetMapTraceRequestBody = {
    data: Data14;
}

export type Data14 = {
    traceStart: number;
    pointCount: number;
    bdTaskID:   string;
}

export type P2PGetMapTraceResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetMapTraceResponseBody;
}

export type P2PGetMapTraceResponseBody = {
    code: number;
    msg:  Ret;
    data: Data15;
}

export type Data15 = {
    tid:        string;
    totalCount: number;
    traceStart: number;
    pointCount: number;
    traceValue: string;
}

export type P2PGetMinorMapResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetMinorMapResponseBody;
}

export type P2PGetMinorMapResponseBody = {
    code: number;
    msg:  Ret;
    data: Data10;
}

export type P2PGetPosResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetPosResponseBody;
}

export type P2PGetPosResponseBody = {
    code: number;
    msg:  Ret;
    data: Data16;
}

export type Data16 = {
    deebotPos: DeebotPos;
    chargePos: DeebotPos[];
    mid:       string;
}

export type DeebotPos = {
    x:       number;
    y:       number;
    a:       number;
    t?:      number;
    invalid: number;
}

export type P2PGetSchedV2Request = {
    body:   P2PGetSchedV2RequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PGetSchedV2RequestBody = {
    data: Data17;
}

export type Data17 = {
    type:     number;
    bdTaskID: string;
}

export type P2PGetSchedV2Response = {
    header: AtrOnAutoEmptyEventHeader;
    body:   P2PGetSchedV2ResponseBody;
}

export type P2PGetSchedV2ResponseBody = {
    data: Dat[];
    code: number;
    msg:  Ret;
}

export type P2PGetWaterInfoResponse = {
    header: AtrOnAutoEmptyEventHeader;
    body:   GetWaterInfoClass;
}

export type P2PSetAutoEmptyRequest = {
    body:   P2PSetAutoEmptyRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetAutoEmptyRequestBody = {
    data: Data18;
}

export type Data18 = {
    act: ActEnum;
}

export type P2PSetCachedMapInfoRequest = {
    body:   P2PSetCachedMapInfoRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetCachedMapInfoRequestBody = {
    data: Data19;
}

export type Data19 = {
    itemType: number;
    act:      string;
    build:    number;
    reMid:    string;
    mid:      string;
    name:     null;
    isFake:   boolean;
    bdTaskID: string;
}

export type P2PSetCleanCountRequest = {
    body:   P2PSetCleanCountRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetCleanCountRequestBody = {
    data: Data20;
}

export type Data20 = {
    count:    number;
    bdTaskID: string;
}

export type P2PSetMapSetRequest = {
    body:   P2PSetMapSetRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetMapSetRequestBody = {
    data: Data21;
}

export type Data21 = {
    act:      string;
    mid:      string;
    type:     DataType;
    subsets:  FluffySubset[];
    bdTaskID: string;
}

export type FluffySubset = {
    mssid: string;
}

export type P2PSetRelocationStateRequest = {
    body:   P2PSetRelocationStateRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetRelocationStateRequestBody = {
    data: Data22;
}

export type Data22 = {
    mode:     string;
    bdTaskID: string;
}

export type P2PSetSchedV2Request = {
    body:   P2PSetSchedV2RequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetSchedV2RequestBody = {
    data: Dat;
}

export type P2PSetSpeedRequest = {
    body:   P2PSetSpeedRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetSpeedRequestBody = {
    data: Data23;
}

export type Data23 = {
    speed:    number;
    bdTaskID: string;
}

export type P2PSetWaterInfoRequest = {
    body:   P2PSetWaterInfoRequestBody;
    header: P2PChargeRequestHeader;
}

export type P2PSetWaterInfoRequestBody = {
    data: Data24;
}

export type Data24 = {
    amount?:    number;
    bdTaskID:   string;
    sweepType?: number;
}
