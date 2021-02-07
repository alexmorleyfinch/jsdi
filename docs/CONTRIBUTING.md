# Contributing

If you want to contribute, here's a TL;DR of how this repo works. First you need to understand our [API](/docs/API.md).

## Container.ts

The class `Container.ts` is the high level class that manages everything.

He's the summary. We have a single top level object (passed into `container()`). We will refer to this object as the "definition".

We have a `definition` (an ad-hoc native JS object) that contains "placeholders" throughout. These placeholders can be deeply nested within the definition.

Our main job is to iteritively find each placeholder and execute it:

- a MakePlaceholder makes instances given a constructor and arguments.
- a RefPlaceholder refers to other parts of the `definition` and should copy the data from where it points, to where it is found.

This poses a question. In what order do we execute the placeholders?

# In what order do we execute the placeholders?

We need to execute them from the bottom up, otherwise we have to deal with all kinds of edge cases. If we don't do it bottom up, we could execute a `make` with references that have not yet been resolved.

So, in order to execute the placeholders from the bottom up, we create a `Graph` data structure with nodes, and each placeholder has a node that defines other placeholders that need to be resolved before this placeholder can be resolved.

The `graph` ends up as a dependency graph with each node being dependent on its sub nodes. This means we can easily ascertain the order by doing a depth first search of the graph.

# How does Container.ts work in general

So, Container.ts:

- builds a dependancy `graph` from all the placeholders found in the `definition` by recursively searching `definition`
- iterates the graph depth first, ending on the root graph node.
- for each node (placeholder), execute the placeholder

The placeholders will always be executed in the right order because of the depth first search.

This means we also have:

- a `GraphNode.ts` for representing the graph.
- one or more `placeholders.ts` which define the types of placeholder.
- a bunch of `utils.ts` for recursive searches and for manipulating deep objects.
