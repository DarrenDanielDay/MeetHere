export function forceCast<OriginalType, TargetType>(obj: OriginalType): TargetType {
    return obj as unknown as TargetType;
}

