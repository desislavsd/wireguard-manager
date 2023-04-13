import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type CreatePeerInput = {
  allowedIPs: Array<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endpoint?: InputMaybe<Scalars['String']>;
  hooks?: InputMaybe<Array<PeerHookInput>>;
  name: Scalars['String'];
  persistentKeepalive?: InputMaybe<Scalars['Int']>;
  presharedKey?: InputMaybe<Scalars['String']>;
  publicKey: Scalars['String'];
  serverId: Scalars['ID'];
};

export type CreatePeerPayload = {
  __typename?: 'CreatePeerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  peer?: Maybe<Peer>;
};

export type CreateServerInput = {
  address: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dns?: InputMaybe<Array<Scalars['String']>>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  firewallMark?: InputMaybe<Scalars['Int']>;
  hooks?: InputMaybe<Array<ServerHookInput>>;
  listenPort?: InputMaybe<Scalars['Int']>;
  mtu?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  natEnabled?: InputMaybe<Scalars['Boolean']>;
  natInterface?: InputMaybe<Scalars['String']>;
  privateKey?: InputMaybe<Scalars['String']>;
  publicKey?: InputMaybe<Scalars['String']>;
};

export type CreateServerPayload = {
  __typename?: 'CreateServerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  server?: Maybe<Server>;
};

export type CreateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user: User;
};

export type DeletePeerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeletePeerPayload = {
  __typename?: 'DeletePeerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  peer?: Maybe<Peer>;
};

export type DeleteServerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteServerPayload = {
  __typename?: 'DeleteServerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  server?: Maybe<Server>;
};

export type DeleteUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ForeignInterface = {
  __typename?: 'ForeignInterface';
  addresses: Array<Scalars['String']>;
  mtu: Scalars['Int'];
  name: Scalars['String'];
};

export type ForeignPeer = {
  __typename?: 'ForeignPeer';
  allowedIps?: Maybe<Array<Scalars['String']>>;
  endpoint?: Maybe<Scalars['String']>;
  lastHandshakeTime?: Maybe<Scalars['DateTime']>;
  persistentKeepAliveInterval: Scalars['Int'];
  protocolVersion: Scalars['Int'];
  publicKey: Scalars['String'];
  receiveBytes: Scalars['Float'];
  transmitBytes: Scalars['Float'];
};

export type ForeignServer = {
  __typename?: 'ForeignServer';
  firewallMark: Scalars['Int'];
  foreignInterface: ForeignInterface;
  listenPort: Scalars['Int'];
  name: Scalars['String'];
  peers: Array<ForeignPeer>;
  publicKey: Scalars['String'];
  type: Scalars['String'];
};

export type GenerateWireguardKeyInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type GenerateWireguardKeyPayload = {
  __typename?: 'GenerateWireguardKeyPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  privateKey: Scalars['String'];
  publicKey: Scalars['String'];
};

export type ImportForeignServerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ImportForeignServerPayload = {
  __typename?: 'ImportForeignServerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  server?: Maybe<Server>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Use this mutation to create a peer */
  createPeer: CreatePeerPayload;
  /** Use this mutation to create a WireGuard server */
  createServer: CreateServerPayload;
  /** Use this mutation to create a User */
  createUser: CreateUserPayload;
  /** Use this mutation to delete a peer */
  deletePeer: DeletePeerPayload;
  /** Use this mutation to delete a WireGuard server */
  deleteServer: DeleteServerPayload;
  /** Use this mutation to delete a User */
  deleteUser: DeleteUserPayload;
  /** Use this mutation to generate a WireGuard key-pair */
  generateWireguardKey: GenerateWireguardKeyPayload;
  /** Use this mutation to import a foreign server */
  importForeignServer: ImportForeignServerPayload;
  /** Use this mutation to log in */
  signIn?: Maybe<SignInPayload>;
  /** Use this mutation to start the WireGuard server */
  startServer: StartServerPayload;
  /** Use this mutation to stop the WireGuard server */
  stopServer: StopServerPayload;
  /** Use this mutation to update a peer */
  updatePeer: UpdatePeerPayload;
  /** Use this mutation to update a WireGuard server */
  updateServer: UpdateServerPayload;
  /** Use this mutation to update a User */
  updateUser: UpdateUserPayload;
};


export type MutationCreatePeerArgs = {
  input: CreatePeerInput;
};


export type MutationCreateServerArgs = {
  input: CreateServerInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeletePeerArgs = {
  input: DeletePeerInput;
};


export type MutationDeleteServerArgs = {
  input: DeleteServerInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationGenerateWireguardKeyArgs = {
  input: GenerateWireguardKeyInput;
};


export type MutationImportForeignServerArgs = {
  input: ImportForeignServerInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationStartServerArgs = {
  input: StartServerInput;
};


export type MutationStopServerArgs = {
  input: StopServerInput;
};


export type MutationUpdatePeerArgs = {
  input: UpdatePeerInput;
};


export type MutationUpdateServerArgs = {
  input: UpdateServerInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Peer = Node & {
  __typename?: 'Peer';
  allowedIPs?: Maybe<Array<Scalars['String']>>;
  createUser?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  deleteUser?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  endpoint: Scalars['String'];
  hooks?: Maybe<Array<PeerHook>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  persistentKeepalive?: Maybe<Scalars['Int']>;
  presharedKey: Scalars['String'];
  publicKey: Scalars['String'];
  server: Server;
  stats?: Maybe<PeerStats>;
  updateUser?: Maybe<User>;
  updatedAt: Scalars['DateTime'];
};

export type PeerHook = {
  __typename?: 'PeerHook';
  command: Scalars['String'];
  runOnCreate: Scalars['Boolean'];
  runOnDelete: Scalars['Boolean'];
  runOnUpdate: Scalars['Boolean'];
};

export type PeerHookInput = {
  command: Scalars['String'];
  runOnCreate: Scalars['Boolean'];
  runOnDelete: Scalars['Boolean'];
  runOnUpdate: Scalars['Boolean'];
};

export type PeerStats = {
  __typename?: 'PeerStats';
  lastHandshakeTime?: Maybe<Scalars['DateTime']>;
  protocolVersion: Scalars['Int'];
  receiveBytes: Scalars['Float'];
  transmitBytes: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  /** Use this query to find foreign servers */
  foreignServers: Array<ForeignServer>;
  /** Use this query to single node */
  node?: Maybe<Node>;
  /** Use this query to find nodes */
  nodes: Array<Maybe<Node>>;
  /** Use this query to find multiple Peers */
  peers: Array<Peer>;
  /** Use this query to find servers */
  servers: Array<Server>;
  /** Use this query to find multiple users */
  users: Array<User>;
  /** Use this query to obtain information about the current logged user */
  viewer: User;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryPeersArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QueryServersArgs = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  query?: InputMaybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type Server = Node & {
  __typename?: 'Server';
  address: Scalars['String'];
  createUser?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  deleteUser?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  dns?: Maybe<Array<Scalars['String']>>;
  enabled: Scalars['Boolean'];
  firewallMark?: Maybe<Scalars['Int']>;
  hooks?: Maybe<Array<ServerHook>>;
  id: Scalars['ID'];
  interfaceStats?: Maybe<ServerInterfaceStats>;
  listenPort?: Maybe<Scalars['Int']>;
  mtu: Scalars['Int'];
  name: Scalars['String'];
  /** @deprecated unimplemented, please don't use */
  natEnabled: Scalars['Boolean'];
  /** @deprecated unimplemented, please don't use */
  natInterface: Scalars['String'];
  peers?: Maybe<Array<Peer>>;
  publicKey: Scalars['String'];
  running: Scalars['Boolean'];
  updateUser?: Maybe<User>;
  updatedAt: Scalars['DateTime'];
};

export type ServerHook = {
  __typename?: 'ServerHook';
  command: Scalars['String'];
  runOnCreate: Scalars['Boolean'];
  runOnDelete: Scalars['Boolean'];
  runOnStart: Scalars['Boolean'];
  runOnStop: Scalars['Boolean'];
  runOnUpdate: Scalars['Boolean'];
};

export type ServerHookInput = {
  command: Scalars['String'];
  runOnCreate: Scalars['Boolean'];
  runOnDelete: Scalars['Boolean'];
  runOnStart: Scalars['Boolean'];
  runOnStop: Scalars['Boolean'];
  runOnUpdate: Scalars['Boolean'];
};

export type ServerInterfaceStats = {
  __typename?: 'ServerInterfaceStats';
  collisions: Scalars['Float'];
  multicast: Scalars['Float'];
  rxBytes: Scalars['Float'];
  rxCompressed: Scalars['Float'];
  rxCrcErrors: Scalars['Float'];
  rxDropped: Scalars['Float'];
  rxErrors: Scalars['Float'];
  rxFifoErrors: Scalars['Float'];
  rxFrameErrors: Scalars['Float'];
  rxLengthErrors: Scalars['Float'];
  rxMissedErrors: Scalars['Float'];
  rxOverErrors: Scalars['Float'];
  rxPackets: Scalars['Float'];
  txAbortedErrors: Scalars['Float'];
  txBytes: Scalars['Float'];
  txCarrierErrors: Scalars['Float'];
  txCompressed: Scalars['Float'];
  txDropped: Scalars['Float'];
  txErrors: Scalars['Float'];
  txFifoErrors: Scalars['Float'];
  txHeartbeatErrors: Scalars['Float'];
  txPackets: Scalars['Float'];
  txWindowErrors: Scalars['Float'];
};

export type SignInInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** Session expiration date time */
  expiresAt: Scalars['DateTime'];
  /** Session expiration duration relative to current time in seconds */
  expiresIn: Scalars['Int'];
  /** Token you can use this token in Authorization header as bearer type */
  token: Scalars['String'];
};

export type StartServerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type StartServerPayload = {
  __typename?: 'StartServerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  server: Server;
};

export type StopServerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type StopServerPayload = {
  __typename?: 'StopServerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  server?: Maybe<Server>;
};

export type UpdatePeerInput = {
  allowedIPs?: InputMaybe<Array<Scalars['String']>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  endpoint?: InputMaybe<Scalars['String']>;
  hooks?: InputMaybe<Array<PeerHookInput>>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  persistentKeepalive?: InputMaybe<Scalars['Int']>;
  presharedKey?: InputMaybe<Scalars['String']>;
  publicKey?: InputMaybe<Scalars['String']>;
};

export type UpdatePeerPayload = {
  __typename?: 'UpdatePeerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  peer?: Maybe<Peer>;
};

export type UpdateServerInput = {
  address?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dns?: InputMaybe<Array<Scalars['String']>>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  firewallMark?: InputMaybe<Scalars['Int']>;
  hooks?: InputMaybe<Array<ServerHookInput>>;
  id: Scalars['ID'];
  listenPort?: InputMaybe<Scalars['Int']>;
  mtu?: InputMaybe<Scalars['Int']>;
  natEnabled?: InputMaybe<Scalars['Boolean']>;
  natInterface?: InputMaybe<Scalars['String']>;
  privateKey?: InputMaybe<Scalars['String']>;
  publicKey?: InputMaybe<Scalars['String']>;
};

export type UpdateServerPayload = {
  __typename?: 'UpdateServerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  server?: Maybe<Server>;
};

export type UpdateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  password?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user: User;
};

export type User = Node & {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  peers?: Maybe<Array<Peer>>;
  servers?: Maybe<Array<Server>>;
  updatedAt: Scalars['DateTime'];
};

export type ServersQueryVariables = Exact<{ [key: string]: never; }>;


export type ServersQuery = { __typename?: 'Query', data: Array<{ __typename?: 'Server', createdAt: Date, updatedAt: Date, deletedAt?: Date | null, id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, peers?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null }> };

export type ServerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ServerQuery = { __typename?: 'Query', data?: { __typename?: 'Peer' } | { __typename?: 'Server', createdAt: Date, updatedAt: Date, deletedAt?: Date | null, id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, peers?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } | { __typename?: 'User' } | null };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerInput;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', mutation: { __typename?: 'CreateServerPayload', clientMutationId?: string | null, data?: { __typename?: 'Server', createdAt: Date, updatedAt: Date, deletedAt?: Date | null, id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, peers?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } | null } };

export type UpdateServerMutationVariables = Exact<{
  input: UpdateServerInput;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', mutation: { __typename?: 'UpdateServerPayload', clientMutationId?: string | null, data?: { __typename?: 'Server', createdAt: Date, updatedAt: Date, deletedAt?: Date | null, id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, peers?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } | null } };

export type DeleteServerMutationVariables = Exact<{
  input: DeleteServerInput;
}>;


export type DeleteServerMutation = { __typename?: 'Mutation', mutation: { __typename?: 'DeleteServerPayload', clientMutationId?: string | null } };

export type StartServerMutationVariables = Exact<{
  input: StartServerInput;
}>;


export type StartServerMutation = { __typename?: 'Mutation', startServer: { __typename?: 'StartServerPayload', clientMutationId?: string | null, server: { __typename?: 'Server', createdAt: Date, updatedAt: Date, deletedAt?: Date | null, id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, peers?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } } };

export type StopServerMutationVariables = Exact<{
  input: StopServerInput;
}>;


export type StopServerMutation = { __typename?: 'Mutation', stopServer: { __typename?: 'StopServerPayload', clientMutationId?: string | null, server?: { __typename?: 'Server', createdAt: Date, updatedAt: Date, deletedAt?: Date | null, id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, peers?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } | null } };

export type ServerWithoutPeersFragment = { __typename?: 'Server', id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null };

export type ServerFragment = { __typename?: 'Server', createdAt: Date, updatedAt: Date, deletedAt?: Date | null, id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, peers?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null };

export type PeersQueryVariables = Exact<{
  serverId: Scalars['ID'];
}>;


export type PeersQuery = { __typename?: 'Query', data?: { __typename?: 'Peer' } | { __typename?: 'Server', id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, data?: Array<{ __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date }> | null, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } | { __typename?: 'User' } | null };

export type PeerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PeerQuery = { __typename?: 'Query', data?: { __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date, server: { __typename?: 'Server', id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } } | { __typename?: 'Server' } | { __typename?: 'User' } | null };

export type CreatePeerMutationVariables = Exact<{
  input: CreatePeerInput;
}>;


export type CreatePeerMutation = { __typename?: 'Mutation', mutation: { __typename?: 'CreatePeerPayload', clientMutationId?: string | null, data?: { __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date, server: { __typename?: 'Server', id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } } | null } };

export type UpdatePeerMutationVariables = Exact<{
  input: UpdatePeerInput;
}>;


export type UpdatePeerMutation = { __typename?: 'Mutation', mutation: { __typename?: 'UpdatePeerPayload', clientMutationId?: string | null, data?: { __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date, server: { __typename?: 'Server', id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } } | null } };

export type DeletePeerMutationVariables = Exact<{
  input: DeletePeerInput;
}>;


export type DeletePeerMutation = { __typename?: 'Mutation', mutation: { __typename?: 'DeletePeerPayload', clientMutationId?: string | null } };

export type PeerWithoutServerFragment = { __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date };

export type PeerFragment = { __typename?: 'Peer', id: string, name: string, description: string, publicKey: string, allowedIPs?: Array<string> | null, endpoint: string, presharedKey: string, persistentKeepalive?: number | null, createdAt: Date, updatedAt: Date, server: { __typename?: 'Server', id: string, name: string, description: string, enabled: boolean, running: boolean, publicKey: string, listenPort?: number | null, firewallMark?: number | null, address: string, dns?: Array<string> | null, mtu: number, interfaceStats?: { __typename?: 'ServerInterfaceStats', rxPackets: number, txPackets: number, rxBytes: number, txBytes: number, rxErrors: number, txErrors: number, rxDropped: number, txDropped: number, multicast: number, collisions: number, rxLengthErrors: number, rxOverErrors: number, rxCrcErrors: number, rxFrameErrors: number, rxFifoErrors: number, rxMissedErrors: number, txAbortedErrors: number, txCarrierErrors: number, txFifoErrors: number, txHeartbeatErrors: number, txWindowErrors: number, rxCompressed: number, txCompressed: number } | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', data: Array<{ __typename?: 'User', id: string, email: string, createdAt: Date, updatedAt: Date }> };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', data?: { __typename?: 'Peer' } | { __typename?: 'Server' } | { __typename?: 'User', id: string, email: string, createdAt: Date, updatedAt: Date } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', mutation: { __typename?: 'CreateUserPayload', clientMutationId?: string | null, data: { __typename?: 'User', id: string, email: string, createdAt: Date, updatedAt: Date } } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', mutation: { __typename?: 'UpdateUserPayload', clientMutationId?: string | null, data: { __typename?: 'User', id: string, email: string, createdAt: Date, updatedAt: Date } } };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', mutation: { __typename?: 'DeleteUserPayload', clientMutationId?: string | null } };

export type UserFragment = { __typename?: 'User', id: string, email: string, createdAt: Date, updatedAt: Date };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'SignInPayload', token: string, expiresAt: Date, expiresIn: number } | null };

export type ViewerFragment = { __typename?: 'User', id: string, email: string, createdAt: Date, updatedAt: Date };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, email: string, createdAt: Date, updatedAt: Date } };

export const ServerWithoutPeersFragmentDoc = gql`
    fragment ServerWithoutPeers on Server {
  id
  name
  description
  enabled
  running
  publicKey
  listenPort
  firewallMark
  address
  dns
  mtu
  interfaceStats {
    rxPackets
    txPackets
    rxBytes
    txBytes
    rxErrors
    txErrors
    rxDropped
    txDropped
    multicast
    collisions
    rxLengthErrors
    rxOverErrors
    rxCrcErrors
    rxFrameErrors
    rxFifoErrors
    rxMissedErrors
    txAbortedErrors
    txCarrierErrors
    txFifoErrors
    txHeartbeatErrors
    txWindowErrors
    rxCompressed
    txCompressed
  }
}
    `;
export const PeerWithoutServerFragmentDoc = gql`
    fragment PeerWithoutServer on Peer {
  id
  name
  description
  publicKey
  allowedIPs
  endpoint
  presharedKey
  persistentKeepalive
  createdAt
  updatedAt
}
    `;
export const ServerFragmentDoc = gql`
    fragment Server on Server {
  ...ServerWithoutPeers
  peers {
    ...PeerWithoutServer
  }
  createdAt
  updatedAt
  deletedAt
}
    ${ServerWithoutPeersFragmentDoc}
${PeerWithoutServerFragmentDoc}`;
export const PeerFragmentDoc = gql`
    fragment Peer on Peer {
  ...PeerWithoutServer
  server {
    ...ServerWithoutPeers
  }
}
    ${PeerWithoutServerFragmentDoc}
${ServerWithoutPeersFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  createdAt
  updatedAt
}
    `;
export const ViewerFragmentDoc = gql`
    fragment Viewer on User {
  id
  email
  createdAt
  updatedAt
}
    `;
export const ServersDocument = gql`
    query Servers {
  data: servers {
    ...Server
  }
}
    ${ServerFragmentDoc}`;

/**
 * __useServersQuery__
 *
 * To run a query within a Vue component, call `useServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useServersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useServersQuery();
 */
export function useServersQuery(options: VueApolloComposable.UseQueryOptions<ServersQuery, ServersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ServersQuery, ServersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ServersQuery, ServersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ServersQuery, ServersQueryVariables>(ServersDocument, {}, options);
}
export function useServersLazyQuery(options: VueApolloComposable.UseQueryOptions<ServersQuery, ServersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ServersQuery, ServersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ServersQuery, ServersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ServersQuery, ServersQueryVariables>(ServersDocument, {}, options);
}
export type ServersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ServersQuery, ServersQueryVariables>;
export const ServerDocument = gql`
    query Server($id: ID!) {
  data: node(id: $id) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;

/**
 * __useServerQuery__
 *
 * To run a query within a Vue component, call `useServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useServerQuery({
 *   id: // value for 'id'
 * });
 */
export function useServerQuery(variables: ServerQueryVariables | VueCompositionApi.Ref<ServerQueryVariables> | ReactiveFunction<ServerQueryVariables>, options: VueApolloComposable.UseQueryOptions<ServerQuery, ServerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ServerQuery, ServerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ServerQuery, ServerQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ServerQuery, ServerQueryVariables>(ServerDocument, variables, options);
}
export function useServerLazyQuery(variables: ServerQueryVariables | VueCompositionApi.Ref<ServerQueryVariables> | ReactiveFunction<ServerQueryVariables>, options: VueApolloComposable.UseQueryOptions<ServerQuery, ServerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ServerQuery, ServerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ServerQuery, ServerQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ServerQuery, ServerQueryVariables>(ServerDocument, variables, options);
}
export type ServerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ServerQuery, ServerQueryVariables>;
export const CreateServerDocument = gql`
    mutation CreateServer($input: CreateServerInput!) {
  mutation: createServer(input: $input) {
    clientMutationId
    data: server {
      ...Server
    }
  }
}
    ${ServerFragmentDoc}`;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateServerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateServerMutation(options: VueApolloComposable.UseMutationOptions<CreateServerMutation, CreateServerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateServerMutation, CreateServerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, options);
}
export type CreateServerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateServerMutation, CreateServerMutationVariables>;
export const UpdateServerDocument = gql`
    mutation UpdateServer($input: UpdateServerInput!) {
  mutation: updateServer(input: $input) {
    clientMutationId
    data: server {
      ...Server
    }
  }
}
    ${ServerFragmentDoc}`;

/**
 * __useUpdateServerMutation__
 *
 * To run a mutation, you first call `useUpdateServerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateServerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServerMutation(options: VueApolloComposable.UseMutationOptions<UpdateServerMutation, UpdateServerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateServerMutation, UpdateServerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateServerMutation, UpdateServerMutationVariables>(UpdateServerDocument, options);
}
export type UpdateServerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateServerMutation, UpdateServerMutationVariables>;
export const DeleteServerDocument = gql`
    mutation DeleteServer($input: DeleteServerInput!) {
  mutation: deleteServer(input: $input) {
    clientMutationId
  }
}
    `;

/**
 * __useDeleteServerMutation__
 *
 * To run a mutation, you first call `useDeleteServerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteServerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteServerMutation(options: VueApolloComposable.UseMutationOptions<DeleteServerMutation, DeleteServerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteServerMutation, DeleteServerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteServerMutation, DeleteServerMutationVariables>(DeleteServerDocument, options);
}
export type DeleteServerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteServerMutation, DeleteServerMutationVariables>;
export const StartServerDocument = gql`
    mutation StartServer($input: StartServerInput!) {
  startServer(input: $input) {
    clientMutationId
    server {
      ...Server
    }
  }
}
    ${ServerFragmentDoc}`;

/**
 * __useStartServerMutation__
 *
 * To run a mutation, you first call `useStartServerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useStartServerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useStartServerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useStartServerMutation(options: VueApolloComposable.UseMutationOptions<StartServerMutation, StartServerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<StartServerMutation, StartServerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<StartServerMutation, StartServerMutationVariables>(StartServerDocument, options);
}
export type StartServerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<StartServerMutation, StartServerMutationVariables>;
export const StopServerDocument = gql`
    mutation StopServer($input: StopServerInput!) {
  stopServer(input: $input) {
    clientMutationId
    server {
      ...Server
    }
  }
}
    ${ServerFragmentDoc}`;

/**
 * __useStopServerMutation__
 *
 * To run a mutation, you first call `useStopServerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useStopServerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useStopServerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useStopServerMutation(options: VueApolloComposable.UseMutationOptions<StopServerMutation, StopServerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<StopServerMutation, StopServerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<StopServerMutation, StopServerMutationVariables>(StopServerDocument, options);
}
export type StopServerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<StopServerMutation, StopServerMutationVariables>;
export const PeersDocument = gql`
    query Peers($serverId: ID!) {
  data: node(id: $serverId) {
    ... on Server {
      data: peers {
        ...PeerWithoutServer
      }
      ...ServerWithoutPeers
    }
  }
}
    ${PeerWithoutServerFragmentDoc}
${ServerWithoutPeersFragmentDoc}`;

/**
 * __usePeersQuery__
 *
 * To run a query within a Vue component, call `usePeersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePeersQuery({
 *   serverId: // value for 'serverId'
 * });
 */
export function usePeersQuery(variables: PeersQueryVariables | VueCompositionApi.Ref<PeersQueryVariables> | ReactiveFunction<PeersQueryVariables>, options: VueApolloComposable.UseQueryOptions<PeersQuery, PeersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PeersQuery, PeersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PeersQuery, PeersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PeersQuery, PeersQueryVariables>(PeersDocument, variables, options);
}
export function usePeersLazyQuery(variables: PeersQueryVariables | VueCompositionApi.Ref<PeersQueryVariables> | ReactiveFunction<PeersQueryVariables>, options: VueApolloComposable.UseQueryOptions<PeersQuery, PeersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PeersQuery, PeersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PeersQuery, PeersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<PeersQuery, PeersQueryVariables>(PeersDocument, variables, options);
}
export type PeersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PeersQuery, PeersQueryVariables>;
export const PeerDocument = gql`
    query Peer($id: ID!) {
  data: node(id: $id) {
    ...Peer
  }
}
    ${PeerFragmentDoc}`;

/**
 * __usePeerQuery__
 *
 * To run a query within a Vue component, call `usePeerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePeerQuery({
 *   id: // value for 'id'
 * });
 */
export function usePeerQuery(variables: PeerQueryVariables | VueCompositionApi.Ref<PeerQueryVariables> | ReactiveFunction<PeerQueryVariables>, options: VueApolloComposable.UseQueryOptions<PeerQuery, PeerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PeerQuery, PeerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PeerQuery, PeerQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PeerQuery, PeerQueryVariables>(PeerDocument, variables, options);
}
export function usePeerLazyQuery(variables: PeerQueryVariables | VueCompositionApi.Ref<PeerQueryVariables> | ReactiveFunction<PeerQueryVariables>, options: VueApolloComposable.UseQueryOptions<PeerQuery, PeerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PeerQuery, PeerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PeerQuery, PeerQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<PeerQuery, PeerQueryVariables>(PeerDocument, variables, options);
}
export type PeerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PeerQuery, PeerQueryVariables>;
export const CreatePeerDocument = gql`
    mutation CreatePeer($input: CreatePeerInput!) {
  mutation: createPeer(input: $input) {
    clientMutationId
    data: peer {
      ...Peer
    }
  }
}
    ${PeerFragmentDoc}`;

/**
 * __useCreatePeerMutation__
 *
 * To run a mutation, you first call `useCreatePeerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreatePeerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreatePeerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreatePeerMutation(options: VueApolloComposable.UseMutationOptions<CreatePeerMutation, CreatePeerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreatePeerMutation, CreatePeerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreatePeerMutation, CreatePeerMutationVariables>(CreatePeerDocument, options);
}
export type CreatePeerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreatePeerMutation, CreatePeerMutationVariables>;
export const UpdatePeerDocument = gql`
    mutation UpdatePeer($input: UpdatePeerInput!) {
  mutation: updatePeer(input: $input) {
    clientMutationId
    data: peer {
      ...Peer
    }
  }
}
    ${PeerFragmentDoc}`;

/**
 * __useUpdatePeerMutation__
 *
 * To run a mutation, you first call `useUpdatePeerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePeerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdatePeerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePeerMutation(options: VueApolloComposable.UseMutationOptions<UpdatePeerMutation, UpdatePeerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdatePeerMutation, UpdatePeerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdatePeerMutation, UpdatePeerMutationVariables>(UpdatePeerDocument, options);
}
export type UpdatePeerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdatePeerMutation, UpdatePeerMutationVariables>;
export const DeletePeerDocument = gql`
    mutation DeletePeer($input: DeletePeerInput!) {
  mutation: deletePeer(input: $input) {
    clientMutationId
  }
}
    `;

/**
 * __useDeletePeerMutation__
 *
 * To run a mutation, you first call `useDeletePeerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePeerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePeerMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeletePeerMutation(options: VueApolloComposable.UseMutationOptions<DeletePeerMutation, DeletePeerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeletePeerMutation, DeletePeerMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeletePeerMutation, DeletePeerMutationVariables>(DeletePeerDocument, options);
}
export type DeletePeerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeletePeerMutation, DeletePeerMutationVariables>;
export const UsersDocument = gql`
    query Users {
  data: users {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a Vue component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUsersQuery();
 */
export function useUsersQuery(options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, {}, options);
}
export function useUsersLazyQuery(options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, {}, options);
}
export type UsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  data: node(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a Vue component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserQuery({
 *   id: // value for 'id'
 * });
 */
export function useUserQuery(variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export function useUserLazyQuery(variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export type UserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserQuery, UserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  mutation: createUser(input: $input) {
    clientMutationId
    data: user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  mutation: updateUser(input: $input) {
    clientMutationId
    data: user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(options: VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($input: DeleteUserInput!) {
  mutation: deleteUser(input: $input) {
    clientMutationId
  }
}
    `;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(options: VueApolloComposable.UseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
}
export type DeleteUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteUserMutation, DeleteUserMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($input: SignInInput!) {
  signIn(input: $input) {
    token
    expiresAt
    expiresIn
  }
}
    `;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignInMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(options: VueApolloComposable.UseMutationOptions<SignInMutation, SignInMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignInMutation, SignInMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignInMutation, SignInMutationVariables>;
export const ViewerDocument = gql`
    query Viewer {
  viewer {
    ...Viewer
  }
}
    ${ViewerFragmentDoc}`;

/**
 * __useViewerQuery__
 *
 * To run a query within a Vue component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useViewerQuery();
 */
export function useViewerQuery(options: VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, {}, options);
}
export function useViewerLazyQuery(options: VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ViewerQuery, ViewerQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, {}, options);
}
export type ViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ViewerQuery, ViewerQueryVariables>;
export const namedOperations = {
  Query: {
    Servers: 'Servers',
    Server: 'Server',
    Peers: 'Peers',
    Peer: 'Peer',
    Users: 'Users',
    User: 'User',
    Viewer: 'Viewer'
  },
  Mutation: {
    CreateServer: 'CreateServer',
    UpdateServer: 'UpdateServer',
    DeleteServer: 'DeleteServer',
    StartServer: 'StartServer',
    StopServer: 'StopServer',
    CreatePeer: 'CreatePeer',
    UpdatePeer: 'UpdatePeer',
    DeletePeer: 'DeletePeer',
    CreateUser: 'CreateUser',
    UpdateUser: 'UpdateUser',
    DeleteUser: 'DeleteUser',
    signIn: 'signIn'
  },
  Fragment: {
    ServerWithoutPeers: 'ServerWithoutPeers',
    Server: 'Server',
    PeerWithoutServer: 'PeerWithoutServer',
    Peer: 'Peer',
    User: 'User',
    Viewer: 'Viewer'
  }
}