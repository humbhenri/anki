// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
import type ButtonGroup from "editor-toolbar/ButtonGroup.svelte";
import type { ButtonGroupProps } from "editor-toolbar/ButtonGroup";
import type { DynamicSvelteComponent } from "sveltelib/dynamicComponent";

import {
    iconButton,
    colorPicker,
    buttonGroup,
    withShortcut,
} from "editor-toolbar/dynamicComponents";
import * as tr from "anki/i18n";

import squareFillIcon from "./square-fill.svg";
import "./color.css";

const foregroundColorKeyword = "--foreground-color";

function setForegroundColor(color: string): void {
    document.documentElement.style.setProperty(foregroundColorKeyword, color);
}

function getForecolor(): string {
    return document.documentElement.style.getPropertyValue(foregroundColorKeyword);
}

function wrapWithForecolor(color: string): void {
    document.execCommand("forecolor", false, color);
}

export function getColorGroup(): DynamicSvelteComponent<typeof ButtonGroup> &
    ButtonGroupProps {
    const forecolorButton = withShortcut({
        shortcut: "F7",
        button: iconButton({
            icon: squareFillIcon,
            className: "forecolor",
            onClick: () => wrapWithForecolor(getForecolor()),
            tooltip: tr.editingSetForegroundColor(),
        }),
    });

    const colorpickerButton = withShortcut({
        shortcut: "F8",
        button: colorPicker({
            onChange: ({ currentTarget }) =>
                setForegroundColor((currentTarget as HTMLInputElement).value),
            tooltip: tr.editingChangeColor(),
        }),
    });

    return buttonGroup({
        id: "color",
        buttons: [forecolorButton, colorpickerButton],
    });
}