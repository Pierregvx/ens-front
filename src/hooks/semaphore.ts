import { BigNumberish, Group } from "@semaphore-protocol/group";
import { generateProof, verifyProof } from "@semaphore-protocol/proof";
import { Identity } from "@semaphore-protocol/identity";
import { create } from "domain";
export async function stringArrayToIdentity(strArray: string[]): Promise<Identity[]> {
  const identities = strArray.map((s) => new Identity(s));
  return identities;
}
export async function IdentitiesToIdentityCommitments(identities: Identity[]): Promise<bigint[]> {
  const identityCommitments = identities.map((i) => i.commitment);
  return identityCommitments;
}
export async function generateGroup(groupstring:string[]) {
  const identities = await stringArrayToIdentity(["pierregvx"]);
  const identityCommitments = await IdentitiesToIdentityCommitments(identities);

  const group = new Group(1, 16, identityCommitments);
  return group;
}

async function computeProof(identity: Identity, group:Group) {
  const externalNullifier = group.root;
  const signal = 1;
  return await generateProof(identity, group, externalNullifier, signal)
}

export async function createProofs(groupstring:string[], identitystring:string) {
  console.log("ok")
  const group = await generateGroup(groupstring);
  const identity = new Identity(identitystring);
  const proof = await computeProof(identity, group);
  return proof;
}