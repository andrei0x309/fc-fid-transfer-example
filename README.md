# fc-fid-transfer-example

Transfer FID example from one account to another account using transferFor function that requires
prrivate key of both accounts.

## Usage

create .env file with the following content(.env.sample):

```bash
PK_FROM=0x...
PK_TO=0x...
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To transfer FID from one account to another account.
