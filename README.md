ng-equalize-height
==============

* A directive that allows to make sure that chosen elements are of the same height.
* Elements that need to have the same height do not need to be siblings.
* Directive recalculates heights when browser is resized.
* There is also an option to force resize calculation via service call: `equalizeHeightService.equalizeHeights();`
* No dependency on JQuery

Example
-------------
In the following example:
* the 1-st and 4-th `div`s will have one same height.
* the 2-nd and 5-th `div`s will have another same height.
```
<div equalize-height>
    <div height-group="1">...</div>
    <div height-group="2">....</div>
    <div></div>
    <div height-group="1">..</div>
    <div height-group="2">.</div>
</div>
```
