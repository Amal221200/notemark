/* eslint-disable prettier/prettier */
import { APP_DIRECTORY_NAME, FILE_ENCODING, WELCOME_FILE_NAME } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types";
import { dialog } from "electron";
import { ensureDir, readFile, readdir, remove, stat, writeFile } from "fs-extra";
import { isEmpty } from "lodash";
import { homedir } from "os";
import path from "path";
import welcomeNote from "../../../resources/welcomeNote.md?asset";

export const getRootDir = () => path.join(homedir(), APP_DIRECTORY_NAME);

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir();

    await ensureDir(rootDir);

    const notesFileNames = await readdir(rootDir, { encoding: FILE_ENCODING, withFileTypes: false })

    const notes = notesFileNames.filter((noteFile) => noteFile.endsWith('.md'))

    if (isEmpty(notes)) {
        const content = await readFile(welcomeNote, { encoding: FILE_ENCODING });
        await writeFile(path.join(rootDir, WELCOME_FILE_NAME), content, { encoding: FILE_ENCODING });
        notes.push(WELCOME_FILE_NAME);
    }

    return Promise.all(notes.map(getNoteFromFilename));
}

export const getNoteFromFilename = async (filename: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDir()}/${filename}`);

    return {
        title: filename.replace(/\.md/, ''),
        lastEditTime: fileStats.mtime.getTime()
    }
}

export const readNote: ReadNote = async (title: string) => {
    const rootDir = getRootDir();

    return await readFile(path.join(rootDir, `${title}.md`), { encoding: FILE_ENCODING });
}

export const createNote: CreateNote = async () => {
    const rootDir = getRootDir();

    await ensureDir(rootDir);

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: "New Note",
        defaultPath: path.join(`${rootDir}`, 'Untitled.md'),
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation'],
        showsTagField: false,
        filters: [{ name: 'MarkDown', extensions: ['md'] }]
    })

    if (canceled || !filePath)
        return false

    const { name: filename, dir: parentDir } = path.parse(filePath);

    if (parentDir !== rootDir) {
        await dialog.showMessageBox({
            type: 'error',
            title: 'Creaton failed',
            message: `All notes must be saved under ${rootDir}.
            Avoid using other directory.`
        })

        return false;
    }

    await writeFile(path.join(rootDir, `${filename}.md`), '')
    return filename
}

export const writeNote: WriteNote = async (title: string, content: string) => {
    const rootDir = getRootDir();

    return await writeFile(path.join(rootDir, `${title}.md`), content, { encoding: FILE_ENCODING });
}

export const deleteNote: DeleteNote = async (title: string) => {
    const rootDir = getRootDir();
    const { response } = await dialog.showMessageBox({
        type: 'warning',
        title: 'Delete Note',
        message: `Are you sure you want to delete ${title}.md?`,
        buttons: ['Delete', 'Cancel'],
        defaultId: 1, // Index of the Cancel Button
        cancelId: 1, // Index of the Cancel Button
    })

    if (response === 1) {
        return false
    }

    await remove(path.join(rootDir, `${title}.md`));
    return true
}