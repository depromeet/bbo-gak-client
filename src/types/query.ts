import { MutationOptions, QueryOptions, UseInfiniteQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';

export type BaseQueryOptions = Omit<QueryOptions, 'queryKey' | 'queryFn'>;

export type BaseSuspenseQueryOptions = Omit<UseSuspenseQueryOptions, 'queryKey' | 'queryFn'>;

export type BaseInfiniteQueryOptions = Omit<UseInfiniteQueryOptions, 'queryKey' | 'queryFn'>;

export type BaseMutationOptions = Omit<MutationOptions, 'mutationKey' | 'mutationFn'>;
