'use client';
import React, { useState } from 'react';
import { addUserToOrg } from '@/app/actions';

export default function AddUser({
  orgId,
  userId,
}: {
  orgId: string;
  userId: string;
}) {
  const [email, setEmail] = useState('');

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User email"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <button
        className="btn btn-primary ml-4"
        onClick={() => addUserToOrg(email, orgId, userId)}
      >
        Add
      </button>
    </>
  );
}
