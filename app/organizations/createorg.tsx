'use client';
import React, { useState } from 'react';
import { createOrgFunc } from '@/app/actions';

export default function CreateOrg({ userId }: { userId: string }) {
  const [newOrgName, setNewOrgName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createOrgFunc(newOrgName, userId);
    setNewOrgName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={newOrgName}
        onChange={(e) => setNewOrgName(e.target.value)}
        placeholder="Enter organization name"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <button type="submit" className="btn btn-primary ml-4">
        Create Organization
      </button>
    </form>
  );
}
