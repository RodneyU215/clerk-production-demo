'use server';
import { clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export async function addUserToOrg(
  email: string,
  orgId: string,
  userId: string
) {
  try {
    await clerkClient.organizations.createOrganizationInvitation({
      organizationId: orgId,
      inviterUserId: userId,
      emailAddress: email,
      role: 'org:member',
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createOrgFunc(name: string, userId: string) {
  await clerkClient.organizations.createOrganization({
    name: name,
    createdBy: userId,
  });
  revalidatePath('/organizations');
}
