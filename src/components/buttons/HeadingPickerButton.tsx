import { TEditor } from "@/types";
import { Level } from "@tiptap/extension-heading";

interface HeadingPickerButtonProps {
  editor: TEditor;
}
const headingList: { name: string; level: Level }[] = [
  {
    level: 1,
    name: "Header",
  },
  {
    level: 2,
    name: "Title",
  },
  {
    level: 3,
    name: "Subtitle",
  },
  {
    level: 4,
    name: "Normal text",
  },
];

const HeadingPickerButton = ({ editor }: HeadingPickerButtonProps) => {
  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn capitalize rounded-none">
        <span>Heading</span>
        <i className="fa-solid fa-chevron-down fa-xs"></i>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 rounded-sm w-32 shadow bg-base-100 border border-base-200"
        data-type="heading"
      >
        {headingList.map((heading) => (
          <li key={heading.name}>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: heading.level })
                  .run()
              }
              className={
                editor.isActive("heading", { level: heading.level })
                  ? "bg-primary"
                  : ""
              }
            >
              {heading.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadingPickerButton;
