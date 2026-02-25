/**
 * @typedef {object} PostBlock
 * @property {'text' | 'code' | 'image' | 'poll'} type
 */

/**
 * @typedef {object} Post
 * @property {string} id
 * @property {object} author
 * @property {string} community
 * @property {string} title
 * @property {PostBlock[]} blocks
 * @property {number} votes
 * @property {number} commentCount
 * @property {string} createdAt
 * @property {string[]} tags
 */

const now = Date.now();
const mins = (n) => new Date(now - n * 60 * 1000).toISOString();
const hours = (n) => new Date(now - n * 60 * 60 * 1000).toISOString();

/** @type {Post[]} */
export const mockPosts = [
  {
    id: "p1",
    author: {
      id: "u2",
      username: "tannerlinsley",
      displayName: "Tanner Linsley",
      avatarUrl: "",
    },
    community: "reactjs",
    title: "TanStack Query v5 — what's actually different",
    blocks: [
      {
        type: "text",
        content:
          "After migrating three production apps to TanStack Query v5, here are the real-world breaking changes that actually matter. The biggest shift is the unified infinite query API.",
      },
      {
        type: "code",
        language: "typescript",
        filename: "query.ts",
        content: `// v4 — two separate hooks
const { data } = useInfiniteQuery(
  ['posts'],
  ({ pageParam = 0 }) => fetchPosts(pageParam),
  { getNextPageParam: (last) => last.nextCursor }
);

// v5 — single options object, explicit initialPageParam
const { data } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam }) => fetchPosts(pageParam),
  initialPageParam: 0,
  getNextPageParam: (last) => last.nextCursor,
});`,
      },
      {
        type: "text",
        content:
          'The removal of `cacheTime` in favor of `gcTime` is a naming win for clarity. Also, `status: "loading"` is now `status: "pending"` — update your conditional renders.',
      },
    ],
    votes: 847,
    commentCount: 64,
    createdAt: hours(3),
    tags: ["typescript", "react-query", "migration"],
  },
  {
    id: "p2",
    author: {
      id: "u3",
      username: "mattpocockuk",
      displayName: "Matt Pocock",
      avatarUrl: "",
    },
    community: "typescript",
    title: "Template literal types are more powerful than you think",
    blocks: [
      {
        type: "text",
        content:
          "Most TypeScript devs use template literal types for string manipulation. But they unlock some genuinely wild inference patterns.",
      },
      {
        type: "code",
        language: "typescript",
        filename: "routes.ts",
        content: `type Route = '/users' | '/users/:id' | '/posts' | '/posts/:id/:slug';

// Extract dynamic segments
type ExtractParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractParams<\`/\${Rest}\`>
    : T extends \`\${string}:\${infer Param}\`
    ? Param
    : never;

type Params = ExtractParams<'/posts/:id/:slug'>;
// ^ "id" | "slug"`,
      },
      {
        type: "poll",
        question: "How often do you use advanced TypeScript types?",
        options: [
          { id: "o1", text: "Daily — type wizardry is my workflow" },
          { id: "o2", text: "Sometimes — when it saves real pain" },
          { id: "o3", text: "Rarely — basic types cover 95% of cases" },
          { id: "o4", text: "Never — TypeScript is already verbose enough" },
        ],
        votes: [312, 518, 203, 97],
        totalVotes: 1130,
        userVote: null,
      },
    ],
    votes: 1204,
    commentCount: 89,
    createdAt: hours(7),
    tags: ["typescript", "type-system", "generics"],
  },
  {
    id: "p3",
    author: {
      id: "u4",
      username: "leeerob",
      displayName: "Lee Robinson",
      avatarUrl: "",
    },
    community: "nextjs",
    title: "Server Actions + Optimistic UI — the pattern that just works",
    blocks: [
      {
        type: "text",
        content:
          "After months of experimenting, this is the pattern I reach for in every Next.js 14+ project. No third-party state managers needed for mutations.",
      },
      {
        type: "code",
        language: "tsx",
        filename: "like-button.tsx",
        content: `'use client';

import { useOptimistic, useTransition } from 'react';
import { toggleLike } from './actions';

export function LikeButton({ postId, initialLiked, count }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticState, addOptimistic] = useOptimistic(
    { liked: initialLiked, count },
    (state, action: 'toggle') => ({
      liked: !state.liked,
      count: state.liked ? state.count - 1 : state.count + 1,
    })
  );

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          addOptimistic('toggle');
          await toggleLike(postId);
        })
      }
      disabled={isPending}
    >
      {optimisticState.liked ? '♥' : '♡'} {optimisticState.count}
    </button>
  );
}`,
      },
    ],
    votes: 632,
    commentCount: 41,
    createdAt: hours(12),
    tags: ["nextjs", "react", "server-actions"],
  },
  {
    id: "p4",
    author: {
      id: "u5",
      username: "sindresorhus",
      displayName: "Sindre Sorhus",
      avatarUrl: "",
    },
    community: "javascript",
    title: "Stop using index.js barrel files — here's why",
    blocks: [
      {
        type: "text",
        content:
          "Barrel files feel tidy. They turn your codebase into a slow-booting mess. Here's what's actually happening when you import from an index.js.",
      },
      {
        type: "image",
        url: "https://cdn.dribbble.com/userupload/14495112/file/original-001bfd00c33513a7b9675945d035c1a0.jpg?resize=1504x1128&vertical=center",
        alt: "Code editor showing JavaScript import performance benchmark results",
      },
      {
        type: "text",
        content:
          "The bundler has to parse every module in the barrel even if you only use one export. In large codebases, this adds hundreds of milliseconds to cold starts. Prefer direct imports.",
      },
    ],
    votes: 2103,
    commentCount: 157,
    createdAt: hours(24),
    tags: ["javascript", "performance", "bundlers"],
  },
  {
    id: "p5",
    author: {
      id: "u6",
      username: "cassidoo",
      displayName: "Cassidy Williams",
      avatarUrl: "",
    },
    community: "css",
    title: "CSS `has()` is the selector game-changer nobody talks about enough",
    blocks: [
      {
        type: "text",
        content:
          ":has() is the closest we've gotten to a \"parent selector\" — and it's supported everywhere now. These patterns replace a surprising amount of JavaScript.",
      },
      {
        type: "code",
        language: "css",
        content: `/* Style a form label when input is focused — no JS */
.field:has(input:focus) label {
  color: var(--color-accent);
}

/* Hide sibling when checkbox is checked */
.card:has(input[type="checkbox"]:checked) .card-details {
  display: none;
}

/* Nav with active child gets highlighted */
nav li:has(a.active) {
  background: var(--color-accent-dim);
  border-left: 2px solid var(--color-accent);
}`,
      },
    ],
    votes: 934,
    commentCount: 52,
    createdAt: mins(45),
    tags: ["css", "selectors", "frontend"],
  },
];

/** @type {import('../hooks/useAuth').User[]} */
export const mockUsers = [
  {
    id: "u7",
    username: "dan_abramov",
    displayName: "Dan Abramov",
    avatarUrl: "",
    karma: 18423,
    bio: "Working on React. Past: Redux, Create React App.",
  },
  {
    id: "u8",
    username: "theo_t3",
    displayName: "Theo Browne",
    avatarUrl: "",
    karma: 9341,
    bio: "T3 stack creator. Building at ping.gg.",
  },
  {
    id: "u9",
    username: "colinhacks",
    displayName: "Colin McDonnell",
    avatarUrl: "",
    karma: 7102,
    bio: "Created Zod. TypeScript enthusiast.",
  },
];

export const trendingTags = [
  { name: "typescript", count: 2341 },
  { name: "react", count: 1892 },
  { name: "nextjs", count: 1204 },
  { name: "rust", count: 987 },
  { name: "bun", count: 743 },
  { name: "tailwind", count: 631 },
  { name: "deno", count: 412 },
];

export const communities = [
  { id: "c1", name: "reactjs", members: 284000 },
  { id: "c2", name: "typescript", members: 196000 },
  { id: "c3", name: "nextjs", members: 142000 },
  { id: "c4", name: "javascript", members: 518000 },
  { id: "c5", name: "css", members: 89000 },
  { id: "c6", name: "golang", members: 74000 },
  { id: "c7", name: "rust", members: 112000 },
];

/** @type {import('../components/comment/CommentCard').Comment[]} */
export const mockComments = [
  {
    id: "c1",
    postId: "p1",
    author: {
      id: "u9",
      username: "colinhacks",
      displayName: "Colin McDonnell",
      avatarUrl: "",
    },
    content:
      'The `gcTime` rename is long overdue. Explaining "staleTime vs cacheTime" to newcomers was always painful. "staleTime vs gcTime" is at least semantically honest.',
    votes: 142,
    createdAt: hours(2),
    parentId: null,
    replies: [
      {
        id: "c2",
        postId: "p1",
        author: {
          id: "u2",
          username: "tannerlinsley",
          displayName: "Tanner Linsley",
          avatarUrl: "",
        },
        content:
          "Exactly the thinking behind it. Thanks for the kind words — v5 took 18 months.",
        votes: 87,
        createdAt: hours(1),
        parentId: "c1",
        replies: [],
      },
    ],
  },
  {
    id: "c3",
    postId: "p1",
    author: {
      id: "u7",
      username: "dan_abramov",
      displayName: "Dan Abramov",
      avatarUrl: "",
    },
    content:
      "Worth noting the new `combine` option for selecting derived data from multiple queries is underappreciated. Replaces a lot of useMemo boilerplate.",
    votes: 98,
    createdAt: hours(2.5),
    parentId: null,
    replies: [],
  },
];
