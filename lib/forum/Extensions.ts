
import StarterKit from "@tiptap/starter-kit";

export const MAX_FORUM_TEXT = 20_000;

export const forumExtensions = [
    StarterKit.configure({
        heading: { levels: [2, 3] },

        link: {
            openOnClick: false,
            autolink: true,
            HTMLAttributes: {
                rel: "nofollow noopener noreferrer ugc",
                target: "_blank",
            },
        },

        horizontalRule: false,
        underline: false,
    }),
];

