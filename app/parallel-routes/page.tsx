import { Boundary } from '#/ui/boundary';
import { DemoHeading } from '#/ui/demo-states';

export default function Page() {
  return (
    <Boundary
      label="page.tsx (Server)"
      size="small"
      className="flex flex-col gap-4"
    >
      <DemoHeading>Channel analytics</DemoHeading>

      <div className="flex flex-col gap-2">
        <div className="h-2 w-4/5 rounded-full bg-gray-800" />
        <div className="h-2 w-1/3 rounded-full bg-gray-800" />
      </div>
    </Boundary>
  );
}
