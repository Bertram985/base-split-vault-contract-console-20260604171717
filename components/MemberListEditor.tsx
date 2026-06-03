"use client";

import { PlusIcon } from "@/components/icons";

export type EditableMember = {
  id: string;
  name: string;
  wallet: string;
};

export function MemberListEditor({
  members,
  onChange,
}: {
  members: EditableMember[];
  onChange: (members: EditableMember[]) => void;
}) {
  function updateMember(id: string, field: keyof EditableMember, value: string) {
    onChange(members.map((member) => (member.id === id ? { ...member, [field]: value } : member)));
  }

  function addMember() {
    onChange([
      ...members,
      {
        id: crypto.randomUUID(),
        name: "",
        wallet: "",
      },
    ]);
  }

  return (
    <section className="builder-block">
      <div className="builder-head">
        <span className="eyebrow">Members</span>
        <button className="line-button compact" onClick={addMember} type="button">
          <PlusIcon />
          Add
        </button>
      </div>
      <div className="editor-stack">
        {members.map((member, index) => (
          <div className="editor-row" key={member.id}>
            <span className="row-index">{index + 1}</span>
            <input
              aria-label="Member name"
              onChange={(event) => updateMember(member.id, "name", event.target.value)}
              placeholder="Member name"
              value={member.name}
            />
            <input
              aria-label="Wallet address"
              onChange={(event) => updateMember(member.id, "wallet", event.target.value)}
              placeholder="Wallet address"
              value={member.wallet}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
