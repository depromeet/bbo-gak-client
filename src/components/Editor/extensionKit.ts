'use client';

import { common, createLowlight } from 'lowlight';
import { StarterKit } from '@tiptap/starter-kit';
import { Blockquote } from '@tiptap/extension-blockquote';
import { BulletList } from '@tiptap/extension-bullet-list';
import { CodeBlock } from '@tiptap/extension-code-block';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Document } from '@tiptap/extension-document';
import { HardBreak } from '@tiptap/extension-hard-break';
import { Heading } from '@tiptap/extension-heading';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Image } from '@tiptap/extension-image';
import { ListItem } from '@tiptap/extension-list-item';
import { Mention } from '@tiptap/extension-mention';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import { Text } from '@tiptap/extension-text';
import { TextStyle } from '@tiptap/extension-text-style';
import { Youtube } from '@tiptap/extension-youtube';
import { Color } from '@tiptap/extension-color';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { FloatingMenu } from '@tiptap/extension-floating-menu';
import { FocusClasses } from '@tiptap/extension-focus';
import { FontFamily } from '@tiptap/extension-font-family';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { ListKeymap } from '@tiptap/extension-list-keymap';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { SlashCommand } from '@/components/Editor/extensions/SlashCommand/SlashCommand';
import { ImageUpload } from '@/components/Editor/extensions/ImageUpload/ImageUpload';
import { Selection } from '@/components/Editor/extensions/Selection/Selection';
import { ImageBlock } from '@/components/Editor/extensions/ImageBlock/ImageBlock';
import { Highlight } from '@tiptap/extension-highlight';
import { FontSize } from '@/components/Editor/extensions/FontSize/FontSize';
import { Link } from '@/components/Editor/extensions/Link/Link';
import { Underline } from '@tiptap/extension-underline';

export function ExtensionKit() {
  const lowlight = createLowlight(common);

  return [
    StarterKit.configure({
      history: { depth: 50 },
    }),
    Selection,
    TextStyle,
    Blockquote,
    BulletList,
    CodeBlock,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Image,
    ImageUpload,
    ImageBlock,
    SlashCommand,
    Document,
    HardBreak,
    Heading,
    HorizontalRule,
    ListItem,
    Mention,
    OrderedList,
    Paragraph,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    TaskItem,
    TaskList,
    Text,
    Youtube,
    Color,
    Dropcursor,
    FloatingMenu,
    FocusClasses,
    FontSize,
    FontFamily,
    Gapcursor,
    ListKeymap,
    Placeholder,
    TextAlign.extend({
      addKeyboardShortcuts() {
        return {};
      },
    }).configure({
      types: ['heading', 'paragraph'],
    }),
    Typography,
    Link,
    Highlight.configure({ multicolor: true }),
    Underline,
  ];
}
