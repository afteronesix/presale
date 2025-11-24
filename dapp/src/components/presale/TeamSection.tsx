import {
  Users,
  User,
  UserCheck,
  UserCog,
  UserPlus,
  UserMinus,
} from "lucide-react";

const members = [
  { icon: <User size={26} />, label: "Anon A" },
  { icon: <UserCheck size={26} />, label: "Anon B" },
  { icon: <UserCog size={26} />, label: "Anon C" },
  { icon: <UserPlus size={26} />, label: "Anon D" },
  { icon: <UserMinus size={26} />, label: "Anon E" },
];

const TeamSection = () => {
  return (
    <div className="relative p-6 rounded-2xl bg-neutral-900/60 border border-neutral-700 shadow-xl backdrop-blur-xl neon-border">
      <div className="flex items-center gap-3 mb-4">
        <Users size={20} className="text-cyan-400" />
        <h2 className="text-xl font-semibold">Core Team (Anonymous)</h2>
      </div>

      <div className="flex justify-between mt-4">
        {members.map((m, i) => (
          <div
            key={i}
            className="w-14 h-14 rounded-full bg-neutral-800 border border-neutral-700 flex flex-col items-center justify-center text-gray-300 hover:border-cyan-400 transition shadow-md"
          >
            {m.icon}
            <span className="text-[10px] mt-1">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
