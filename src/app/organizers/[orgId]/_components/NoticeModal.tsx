import { MdOutlineInfo } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Provider {
  text: string;
}

function NoticeModal({ text }: Provider) {
  return (
    <Dialog>
      <DialogTrigger className="mb-3">
        <div className="flex items-center justify-start gap-1 bg-white text-black rounded-full px-3 py-0">
          <span>Notice!</span>
          &nbsp;
          <MdOutlineInfo className="shine-notice" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Important Notice!</DialogTitle>
          <DialogDescription>
            <div className="nf">
              <p
                className="text rte rte-settings"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>{" "}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default NoticeModal;
