import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../components/primitives/Avatar";
import { Button } from "../components/primitives/Button";
import { Divider } from "../components/primitives/Divider";
import { Input, Textarea } from "../components/primitives/Input";
import { PostCard } from "../components/post/PostCard";
import { mockPosts, mockUsers } from "../data/mockPosts";
import { useAuthStore } from "../store/authStore";
import { formatCount } from "../utils/formatCount";
import { formatDateFull } from "../utils/formatDate";

export default function ProfilePage() {
  const { username } = useParams();
  const { user } = useAuthStore();
  const token = localStorage.getItem("token");
  const API_BASE = "http://localhost:3000/api";

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [form, setForm] = useState({ name: "", bio: "" });

  const isOwnProfile = useMemo(() => {
    if (!user?.username) return false;
    if (!username) return true;
    return username === user.username;
  }, [user?.username, username]);

  const profileUsername = username ?? mockUsers[0]?.username;
  const found = mockUsers.find((u) => u.username === profileUsername);

  const fallbackProfile = found ?? {
    id: "guest",
    username: profileUsername ?? "unknown",
    displayName: profileUsername ?? "Unknown",
    avatarUrl: "",
    karma: 0,
    bio: "",
    joinedAt: new Date().toISOString(),
  };

  const profile = profileData
    ? {
        id: profileData.user._id,
        username: profileData.user.username,
        displayName: profileData.profile.name,
        avatarUrl: "",
        karma: 0,
        bio: profileData.profile.bio,
        joinedAt: profileData.user.createdAt,
      }
    : fallbackProfile;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const target = username
          ? `${API_BASE}/profile/${username}`
          : `${API_BASE}/profile/me`;

        const headers = {};
        if (!username && token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(target, { headers });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to load profile");
        }

        const data = await res.json();
        setProfileData(data);
        setForm({
          name: data.profile?.name || data.user?.username || "",
          bio: data.profile?.bio || "",
        });
      } catch (err) {
        setProfileData(null);
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    if (!username && !token) return;
    loadProfile();
  }, [username, token]);

  const handleSaveProfile = async () => {
    try {
      if (!token) {
        setError("Please login to save your profile");
        return;
      }

      setIsSaving(true);
      setError("");

      const res = await fetch(`${API_BASE}/profile/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          bio: form.bio,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      setProfileData(data);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const userPosts = mockPosts.filter(
    (p) => p.author.username === profile.username
  );

  return (
    <div className="space-y-5">
      <header className="bg-surface border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              size="xl"
              username={profile.username}
              alt={profile.displayName}
              src={profile.avatarUrl || undefined}
            />

            <div className="space-y-2 w-64">
              {isEditing ? (
                <>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="h-9"
                  />
                  <Textarea
                    value={form.bio}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    placeholder="Add bio..."
                    className="min-h-20"
                  />
                </>
              ) : (
                <>
                  <h1 className="font-mono text-xl font-bold text-text">
                    {profile.displayName}
                  </h1>
                  <p className="text-sm text-muted">@{profile.username}</p>
                  {profile.bio && (
                    <p className="text-sm text-text font-sans leading-relaxed">
                      {profile.bio}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={handleSaveProfile}
                disabled={isSaving || !form.name.trim()}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              disabled={!isOwnProfile}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>

        {isLoading && (
          <p className="text-xs text-muted font-sans">Loading profile...</p>
        )}
        {error && <p className="text-xs text-danger font-sans">{error}</p>}

        <Divider />

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

      <section>
        <h2 className="font-mono text-sm font-semibold text-text mb-4">
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