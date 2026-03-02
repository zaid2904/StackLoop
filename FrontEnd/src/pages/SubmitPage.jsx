import { Button } from "../components/primitives/Button";
import { Input, Textarea } from "../components/primitives/Input";

/**
 * SubmitPage — standalone post composer page.
 */
export default function SubmitPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-mono text-xl font-bold text-text">Create Post</h1>
      <section className="bg-surface border border-border rounded-xl p-4 space-y-4">
        <Input value="" readOnly placeholder="Post title" aria-label="Post title" />
        <Input value="" readOnly placeholder="Community" aria-label="Community" />
        <Textarea
          value=""
          readOnly
          rows={6}
          placeholder="Write your post content..."
          aria-label="Post content"
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" disabled>
            Cancel
          </Button>
          <Button type="button" variant="primary" disabled>
            Post
          </Button>
        </div>
      </section>
    </div>
  );
}
