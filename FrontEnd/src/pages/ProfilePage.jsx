import { useParams, Link } from "react-router-dom";
import { Avatar } from "../components/primitives/Avatar";
import { Badge } from "../components/primitives/Badge";
import { Button } from "../components/primitives/Button";
import { Divider } from "../components/primitives/Divider";
import { PostCard } from "../components/post/PostCard";
import { mockPosts, mockUsers } from "../data/mockPosts";
import { useAuthStore } from "../store/authStore";
import { formatCount } from "../utils/formatCount";
import { formatDateFull } from "../utils/formatDate";

/**
 * ProfilePage — user profile with posts + stats.
 * Lazy-loaded via React.lazy in App.jsx.
 */
export default function ProfilePage() {
  const { username } = useParams();
  const { user: currentUser } = useAuthStore();

  // Resolve profile: URL param (/u/:username) or fall back to current user
  const profileUsername = username ?? currentUser?.username;
  const found =
    mockUsers.find((u) => u.username === profileUsername) ?? currentUser;
  const profile = found ?? {
    id: "guest",
    username: profileUsername ?? "unknown",
    displayName: profileUsername ?? "Unknown",
    avatarUrl: "",
    karma: 0,
    bio: "",
    joinedAt: new Date().toISOString(),
  };

  const isOwnProfile = currentUser?.username === profile.username;
  const userPosts = mockPosts.filter(
    (p) => p.author.username === profile.username,
  );

  return (
    <div className="space-y-5">
      {/* Profile card */}
      <header className="bg-surface border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              size="xl"
              username={profile.username}
              alt={profile.displayName}
              src={profile.avatarUrl || undefined}
            />
            <div className="space-y-1">
              <h1 className="font-mono text-xl font-bold text-text">
                {profile.displayName}
              </h1>
              <p className="text-sm text-muted">@{profile.username}</p>
              {profile.bio && (
                <p className="text-sm text-text font-sans leading-relaxed max-w-sm">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
          {isOwnProfile ? (
            <Button variant="ghost" size="sm">
              Edit Profile
            </Button>
          ) : (
            <Button variant="primary" size="sm">
              Follow
            </Button>
          )}
        </div>

        <Divider />

        {/* Stats row */}
        <dl className="flex flex-wrap gap-6">
          {[
            { label: "Karma", value: formatCount(profile.karma ?? 0) },
            { label: "Posts", value: formatCount(userPosts.length) },
            {
              label: "Joined",
              value: profile.joinedAt
                ? formatDateFull(profile.joinedAt)
                : "N/A",
            },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <dt className="text-xs text-muted font-sans">{label}</dt>
              <dd className="font-mono text-sm font-semibold text-text mt-0.5">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Posts */}
      <section aria-labelledby="profile-posts-heading">
        <h2
          id="profile-posts-heading"
          className="font-mono text-sm font-semibold text-text mb-4"
        >
          Posts by {profile.displayName}
        </h2>

        {userPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted font-sans">No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
