import { createAction, props } from '@ngrx/store';

export const InitializeProfileCache = createAction(
  '[Initialize Profile Cache] Initialize Profile Cache',
);

export const UpdateLoadedEntityInCache = createAction(
  '[Update LoadedEntity InCache] Update LoadedEntity InCache',
  props<{ payload: string, entity: any }>()
);
