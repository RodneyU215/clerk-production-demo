import { auth, clerkClient } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import CreateOrg from './createorg';
import AddUser from './addUser';

export default async function OrgPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const orgs = await clerkClient.organizations.getOrganizationList({
    includeMembersCount: true,
  });

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <CreateOrg userId={userId} />
      {orgs && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Organization Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Member count
              </th>{' '}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Add User
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orgs.map((org) => (
              <tr key={org.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {org.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {org.createdBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {org.members_count || 0}
                </td>
                <td className="px-6 py-4">
                  <AddUser orgId={org.id} userId={userId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
