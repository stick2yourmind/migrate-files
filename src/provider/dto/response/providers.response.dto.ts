import { Provider } from "src/provider/entities/provider.entity";


function mapProviders(providers: Provider[]) {
  const result = {
    auth_module: {} as Record<string, string[]>,
    content_module: {} as Record<string, string[]>,
  };

  providers.forEach(provider => {
    // auth_module
    const authKey = `authn.provider_${provider.authModule}`;
    if (!result.auth_module[authKey]) {
      result.auth_module[authKey] = [];
    }
    provider.users.forEach(user => {
      result.auth_module[authKey].push(`./${user.file}`);
    });

    // content_module
    const contentKey = `authz.provider_${provider.contentModule}`;
    if (!result.content_module[contentKey]) {
      result.content_module[contentKey] = [];
    }
    provider.users.forEach(user => {
      result.content_module[contentKey].push(`./${user.file}`);
    });
  });

  return result
}

export class ProvidersResponseDto {
  auth_module: Record<string, string[]>;
  content_module: Record<string, string[]>;

    constructor(providers: Provider[]) {
    const mapped = mapProviders(providers);
    this.auth_module = mapped.auth_module;
    this.content_module = mapped.content_module;
  }
}
