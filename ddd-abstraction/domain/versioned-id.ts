export class VersionedId {

    public static INITIAL_VERSION: number = 0;
    private static LATEST_VERSION: number = Number.MAX_VALUE;
    
    private id: any;
    private version: number;
    
    constructor(id: any, version: number) {        
        // Validate.notNull(id, "id is required");
        // Validate.isTrue(version >= INITIAL_VERSION, "version must be greater than or equal to INITIAL_VERSION");
        this.id = id;
        this.version = version;
    }
    
    public static random(): VersionedId {
        return this.forInitialVersion(Guid.newGuid());
    }
    
    public static forInitialVersion(id: any): VersionedId {
        return this.forSpecificVersion(id, VersionedId.INITIAL_VERSION);
    }

    public static forLatestVersion(id: any): VersionedId {
        return this.forSpecificVersion(id, VersionedId.LATEST_VERSION);
    }

    public static forSpecificVersion(id: any, version: number): VersionedId {
        return new VersionedId(id, version);
    }

    public getId(): any {
        return this.id;
    }
    
    public getVersion(): number {
        return this.version;
    }
    
    public isForInitialVersion(): boolean {
        return this.version == VersionedId.INITIAL_VERSION;
    }

    public isForLatestVersion(): boolean {
        return this.version == VersionedId.LATEST_VERSION;
    }
    
    public isForSpecificVersion(): boolean {
        return !this.isForLatestVersion();
    }
    
    public withVersion(version: number): VersionedId {
        return VersionedId.forSpecificVersion(this.id, version);
    }

    public nextVersion(): VersionedId {
        if (this.isForLatestVersion()) {
            return this; 
        } else {
            return this.withVersion(this.version + 1);
        }
    }
    
    public equalsIgnoreVersion(other: VersionedId): boolean {
        if (this == other) {
            return true;
        }
        if (other == null) {
            return false;
        }
        return this.id.equals(other.id);
    }
    
    public isCompatible(other: VersionedId): boolean {
        //Validate.isTrue(other.isForSpecificVersion(), "cannot check for compatibility with non-specific version");
        if (this.isForLatestVersion()) {
            return this.equalsIgnoreVersion(other);
        } else {
            return this.equals(other);
        }
    }

    public toString(): string {
        if (this.isForLatestVersion()) {
            return this.id.toString();
        } else {
            return this.id + "#" + this.version;
        }
    }
}
