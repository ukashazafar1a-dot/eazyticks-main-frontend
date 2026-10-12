import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface Provider {
  open: boolean;
  handleClose: any;
}

function LoginModal({ open, handleClose }: Provider) {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="border-0 text-white md-max:h-auto"
        style={{
          backgroundImage:
            "linear-gradient(104deg, rgb(124 42 24) 5%, #f85431)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">
            Sign In. Enjoy More Feature&lsquo;s
          </DialogTitle>
          <div className="text-white">
            <DialogDescription className="m-0 text-white mb-2">
              Discover recommended events, follow your favorite organizers, save
              events to your favorites, and breeze through checkout.
            </DialogDescription>
            <div className="flex items-center justify-end">
              <Link
                href="/account/signin"
                className="bg-white text-black py-1 px-2 rounded"
              >
                Sign In
              </Link>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
